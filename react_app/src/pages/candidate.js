import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {candidateActions} from "../actions";
import {Link} from "react-router-dom";

function Candidate({match}) {
    let candidates = useSelector(state => state.candidates);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!candidates.items) { //in case of refresh...
            dispatch(candidateActions.getCandidates());
        }
    }, [dispatch]);

    if (!candidates.items) {
        return null;
    }
    const {
        params: { candidateId }
    } = match;
    const candidate = candidates.items[candidateId - 1];
    const {first_name, last_name, job_title, gender, job_description, email, avatar} = candidate;

    return (
        <>
            <img src={avatar} alt="candidate avatar" height="125" width="125" style={{float: "right"}}/>
            {[{label: 'Candidate ID', value: candidateId},
                {label: 'Candidate Name', value: first_name + ' ' + last_name},
                {label: 'Job Title', value: job_title},
                {label: 'Gender', value: gender},
                {label: 'Job Description', value: job_description},
                {label: 'Email Address', value: email}].map(({label, value}) =>
                (<p>
                    <strong>{label}: </strong>
                    {value}
                </p>))
            }
            <p>
                <Link to="/candidates">Back to candidates</Link>
            </p>
        </>
    );
}

export {Candidate};