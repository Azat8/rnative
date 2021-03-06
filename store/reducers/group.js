import groupConstants from '../constants/group';

const initialState = {
  groups: [],
  selectedUsers: [],
  selectedGroup: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case groupConstants.CREATE_GROUP:
      return {
        ...state,
        groups: [
          ...state.groups, 
          action.payload
        ],
      };
    case groupConstants.SELECT_GROUP:
      return {
        ...state,
        selectedGroup: action.payload
      };
    case groupConstants.ADD_USERS_TO_GROUP:
      state.selectedGroup.users = [...state.selectedGroup.users, ...action.payload];
      return state;
    case groupConstants.REORDER_USERS:
      state.selectedGroup.users = [...action.payload];
      return state;
    case groupConstants.REMOVE_USER_FROM_GROUP:
      state.selectedGroup.users = state.selectedGroup.users.filter(user => user != action.payload);
      return state;
    case groupConstants.CHANGE_USER_GROUP:
      state.groups = state.groups.map(g => {
        if (g == action.payload.group) {
          g.users = [...g.users, action.payload.user];
        }
        return g;
      });
      return state;
    default:
      return state
  }
}
