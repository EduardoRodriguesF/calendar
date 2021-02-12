import { combineReducers } from 'redux';
import date from './date/reducer';
import modal from './modal/reducer';

export default combineReducers({
  date,
  modal,
});
