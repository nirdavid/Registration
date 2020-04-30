import { alertConstants } from '../constants';

const success = (msg) => ({type: alertConstants.SUCCESS, msg});
const error = (msg) => ({type: alertConstants.ERROR, msg});
const clear = () => ({type: alertConstants.CLEAR});

export const alertActions = {
    success,
    error,
    clear
};
