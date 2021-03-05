import groupConstants from '../constants/group';

export const create = payload => {
  // console.log('--------');
  // const navigationRef = React.createRef();

  // console.log('payload55555');
  return dispatch => {    
    dispatch({ type: groupConstants.CREATE_GROUP, payload });
    dispatch({ type: groupConstants.CREATE_GROUP, payload });
  }
};