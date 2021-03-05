// import React from 'react';
import userConstants from '../constants/user';

export const register = user => {
  // console.log('--------');
  // const navigationRef = React.createRef();

  // console.log('user55555');
  return dispatch => {
    console.log(dispatch);
    const { username, password } = user;
    
    console.log('USER_REGISTER');
    return dispatch({ type: userConstants.USER_REGISTER, user });
    // navigationRef.current.navigate('/Home');
  }
};