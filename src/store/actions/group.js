import groupConstants from '../constants/group';
import { modalActions, modalTypes } from '../constants/modal';

export const addGroup = payload => {
  return dispatch => {    
    dispatch({ type: modalActions.TOGGLE, payload: { [modalTypes.CREATE_GROUP_MODAL]: false } });
    dispatch({ type: groupConstants.CREATE_GROUP, payload });
  }
};

export const selectGroup = payload => dispatch => dispatch({ type: groupConstants.SELECT_GROUP, payload });

export const removeGroup = payload => dispatch => dispatch({ type: groupConstants.REMOVE_GROUP, payload });

export const addUsersToGroup = payload => dispatch => { 
  dispatch({ type: modalActions.TOGGLE, payload: { [modalTypes.USER_LIST_MODAL]: false } });
  dispatch({ type: groupConstants.ADD_USERS_TO_GROUP, payload });
}

export const removeUserFromGroup = payload => dispatch => { 
  dispatch({ type: groupConstants.REMOVE_USER_FROM_GROUP, payload });
}

export const changeUserGroup = payload => dispatch => dispatch({ type: groupConstants.CHANGE_USER_GROUP, payload });

export const reorderUsers = payload => dispatch => dispatch({ type: groupConstants.REORDER_USERS, payload });
