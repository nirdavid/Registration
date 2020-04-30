import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {candidateActions} from '../actions';

function Candidates() {
    const candidates = useSelector(state => state.candidates);
    const user = useSelector(state => state.signIn.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(candidateActions.getCandidates());
    }, [dispatch]);

    return (
        <div className="col-lg-10 offset-lg-2">
            <h1>Hi {user && user.username}!</h1>
            <h3>All candidates:</h3>
            {candidates.loading && <em>Loading users...</em>}
            {candidates.msg && <span className="text-danger">ERROR: {candidates.msg}</span>}
            {candidates.items &&
            <ul>
                {candidates.items.map(({id, first_name, last_name, job_title, avatar}, index) =>
                    <li key={id}>
                        <img src={avatar} alt="candidate avatar" height="42" width="42"/>
                        {first_name + ' ' + last_name + ' - ' + job_title + ' - '}
                        <Link to={`/candidates/${id}`}>Full Details</Link>
                    </li>
                )}
            </ul>
            }
            <p>
                <Link to="/signin">Logout</Link>
            </p>
        </div>
    );
}

export {Candidates};