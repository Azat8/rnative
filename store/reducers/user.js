import userConstants from '../constants/user';

const initialState = {
  username: '',
  password: '',
  isLogedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN:
      return {
        ...state,
        isLogedIn: true
      };
    case userConstants.USER_REGISTER:
      return {
        ...action.user,
        isLogedIn: true
      };
    case userConstants.USER_LOGOUT:
      return {
        ...state,
        isLogedIn: false
      };
    default:
      return state
  }
}
