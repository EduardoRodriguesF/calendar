import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';
import { IDateState } from './modules/date/types';

export interface IState {
  date: IDateState;
}

const store = createStore(rootReducer);

export default store;
