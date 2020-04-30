import React, {useState} from 'react';

function Form({fieldsStaticData, title, actions, handleSubmit}) {

    const initialValues = {};
    for (let [fieldName, {initialValue}] of Object.entries(fieldsStaticData)) {
        initialValues[fieldName] = initialValue;
    }
    const [fields, setFields] = useState(initialValues);
    const [submitted, setSubmitted] = useState(false);

    const onFieldChange = (e) => {
        const { name, value } = e.target;
        setFields(inputs => ({ ...inputs, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (Object.keys(fields).every(fieldName => {
            const validator = fieldsStaticData[fieldName].validator;
            return validator && validator(fields[fieldName]); //check _.isFunction(validator)
        })) {
            handleSubmit(fields);
        }
    };

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>{title}</h2>
            <form name={"form_" + title} onSubmit={onSubmit}>
                {Object.keys(fields).map((fieldName) => {
                    const value = fields[fieldName];
                    const {validator, label, type, error} = fieldsStaticData[fieldName];
                    const isValid = validator && validator(value); //check _.isFunction
                    const showError = submitted && !isValid;
                    return (
                        <div key={fieldName} className="form-group">
                            <label>{label}</label>
                            <input
                                type={type || "text"}
                                name={fieldName}
                                value={value}
                                onChange={onFieldChange}
                                className={'form-control' + (showError ? ' is-invalid' : '')}
                            />
                            {showError &&
                            <div className="invalid-feedback">{error}</div>
                            }
                        </div>)
                })}
                <div className="form-group">
                    {actions.left}
                    {actions.right}
                </div>
            </form>
        </div>
    );
}

export {Form};