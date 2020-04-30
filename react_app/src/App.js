import './App.css';
import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute } from './privateRoute';
import { Candidates } from './pages/candidates';
import { Candidate } from './pages/candidate';
import { SignIn } from './forms/signIn';
import { SignUp } from './forms/signUp';
import { history } from './helpers';
import {alertActions} from "./actions/alertActions";

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen(() => {
            dispatch(alertActions.clear()); // on location change
        });
    }, [dispatch]);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.msg &&
                    <div className={`alert ${alert.type}`}>{alert.msg}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/candidates" component={Candidates} />
                            <Route path="/candidates/:candidateId" component={Candidate} />
                            <Route path="/signin" component={SignIn} />
                            <Route path="/signup" component={SignUp} />
                            <Redirect from="*" to="/candidates" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;
