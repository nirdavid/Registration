import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions';
import {Form} from './form';
import {isNonEmpty} from "../validators/validator";

function SignIn() {
    const loggedIn = useSelector(state => state.signIn.loggedIn);
    const dispatch = useDispatch();
    const fields = {
        username: {initialValue: '', label: 'Username', validator: isNonEmpty, error: 'Username is required'},
        password: {initialValue: '', label: 'Password', validator: isNonEmpty, error: 'Password is required', type: 'password'}
    };

    // reset login
    useEffect(() => {
        dispatch(userActions.signOut());
    }, [dispatch]);

    const handleSubmit = (user) => {
        dispatch(userActions.signIn(user))
    };

    const loginButton =
        <button className="btn btn-primary">
            {loggedIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Sign In
        </button>;

    return (
        <Form
            title="Sign In"
            fieldsStaticData={fields}
            actions={
                {
                    left: loginButton,
                    right: <Link to="/signup" className="btn btn-link">Register</Link>
                }
            }
            handleSubmit={handleSubmit}
        />
    );
}

export {SignIn};