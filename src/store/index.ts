import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';
import { IDateState } from './modules/date/types';
import { IEventsState } from './modules/events/types';

export interface IState {
  date: IDateState;
  modal: boolean;
  events: IEventsState;
}

const store = createStore(rootReducer);

export default store;
