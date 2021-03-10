import userConstants from '../constants/user';

export const register = user => dispatch => dispatch({ type: userConstants.USER_REGISTER, user });

export const nextStep = () => dispatch => dispatch({type: userConstants.USER_NEXT_STEP});

export const backStep = () => dispatch => dispatch({type: userConstants.USER_BACK_STEP});

export const cameraRotate = () => dispatch => dispatch({type: userConstants.USER_CAMERA_ROTATE});

export const userUpdate = payload => dispatch => dispatch({type: userConstants.USER_UPDATE, payload});

