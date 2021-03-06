import { modalActions, modalTypes } from '../constants/modal';

const initialState = {
  [modalTypes.CREATE_GROUP_MODAL]: false,
  [modalTypes.USER_LIST_MODAL]: false,
  [modalTypes.CHANGE_GROUP_MODAL]: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case modalActions.TOGGLE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state
  }
}
