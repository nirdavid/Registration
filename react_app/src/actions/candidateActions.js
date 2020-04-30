import {candidatesConstants} from "../constants/candidatesConstants";
import {candidateService} from "../services";

export const candidateActions = {
    getCandidates
};

function getCandidates() {
    const request = () => ({type: candidatesConstants.GET_ALL_REQUEST});
    const success = (candidates) => ({type: candidatesConstants.GET_ALL_SUCCESS, candidates});
    const failure = (msg) => ({type: candidatesConstants.GET_ALL_FAILURE, msg});

    return dispatch => {
        dispatch(request());

        candidateService.getCandidates()
            .then(
                responseData => dispatch(success(responseData.candidates)),
                error => dispatch(failure(error.toString()))
            );
    };
}