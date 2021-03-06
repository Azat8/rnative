import {combineReducers} from "redux";
import user from './user';
import modal from './modal';
import group from './group';

export default combineReducers({
  user,
  modal,
  group
});