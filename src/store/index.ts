import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';
import { IDateState } from './modules/date/types';

export interface IState {
  date: IDateState;
  modal: boolean;
}

const store = createStore(rootReducer);

export default store;
