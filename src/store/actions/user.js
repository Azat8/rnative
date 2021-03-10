// import React from 'react';
import userConstants from '../constants/user';

export const register = user => {
  // console.log('--------');
  // const navigationRef = React.createRef();

  // console.log('user55555');
  return dispatch => {
    console.log(dispatch);
    const { password, email, lastName, firstName } = user;
    
    console.log('USER_REGISTER');
    return dispatch({ type: userConstants.USER_REGISTER, user });
    // navigationRef.current.navigate('/Home');
  }
};

export const nextStep = () => {
	return dispatch => {
    	return dispatch({type: userConstants.USER_NEXT_STEP});
  }
}

export const backStep = () => {
	return dispatch => {
    	return dispatch({type: userConstants.USER_BACK_STEP});
  }
}

export const cameraRotate = () => {
  return dispatch => {
      return dispatch({type: userConstants.USER_CAMERA_ROTATE});
  }
}

export const userUpdate = payload => dispatch => dispatch({type: userConstants.USER_UPDATE, payload});

