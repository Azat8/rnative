import groupConstants from '../constants/group';

const initialState = [];

export default (state = initialState, action) => {
  console.log(state, action, "dawwda");
  switch (action.type) {
    case groupConstants.CREATE_GROUP:
      return [
        ...state,
        action.payload
      ];
    default:
      return state
  }
}
