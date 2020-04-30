import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isCookieExists} from "./helpers";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        return (
            isCookieExists('token')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/signin', state: {from: props.location} }} />
        )
    }} />
);