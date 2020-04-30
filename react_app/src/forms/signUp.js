import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions';
import {Form} from './form';
import {isNonEmpty, isEmail} from "../validators/validator";

function SignUp() {
    const registering = useSelector(state => state.signUp.registering);
    const dispatch = useDispatch();
    const fields = {
        username: {initialValue: '', label: 'Username', validator: isNonEmpty, error: 'Username is required'},
        email: {initialValue: '', label: 'Email', validator: isEmail, error: 'Valid Email is required'},
        password: {initialValue: '', label: 'Password', validator: isNonEmpty, error: 'Password is required', type: 'password'}
    };

    // reset login
    useEffect(() => {
        dispatch(userActions.signOut());
    }, [dispatch]);

    const handleSubmit = (user) => {
        dispatch(userActions.signUp(user));
    };

    const registerButton =
        <button className="btn btn-primary">
            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Register
        </button>;

    return (
        <Form
            title="Sign Up"
            fieldsStaticData={fields}
            actions={
                {
                    left: registerButton,
                    right: <Link to="/signin" className="btn btn-link">Cancel</Link>
                }
            }
            handleSubmit={handleSubmit}
        />
    );
}

export {SignUp};