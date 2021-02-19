import { combineReducers } from 'redux';
import date from './date/reducer';
import modal from './modal/reducer';
import events from './events/reducer';

export default combineReducers({
  date,
  modal,
  events,
});
