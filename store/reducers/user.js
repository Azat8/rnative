import userConstants from '../constants/user';

const initialState = {
  email: '',
  gender: 0,
  job: 0,
  lastName: '',
  firstName: '',
  department: 0,
  password: '',
  isLogedIn: false,
  step: 0,
  cameraRotate: true,
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
  	case userConstants.USER_NEXT_STEP:
  		return {
        ...state,
        step: state.step += 1
      };
  	case userConstants.USER_BACK_STEP:
  		return {
        ...state,
        step: state.step -= 1
      };
    case userConstants.USER_CAMERA_ROTATE:
      return {
        ...state,
        cameraRotate: !state.cameraRotate
      };  
    default:
      return state
  }
}
