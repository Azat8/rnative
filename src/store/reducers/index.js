import {combineReducers} from "redux";
import user from './user';
import modal from './modal';
import group from './group';
import validation from './validation';

export default combineReducers({
  user,
  modal,
  group,
  validation
});