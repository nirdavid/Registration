export const isNonEmpty = (fieldValue) => !(fieldValue === '' || fieldValue === null);

export const isEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const isMinLength = (fieldValue) => (fieldValue && fieldValue.length >= 6);
