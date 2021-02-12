import { Reducer } from 'redux';

const INITIAL_STATE = false;

const modal: Reducer<boolean> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL': {
      return !state;
    }
    default: {
      return state;
    }
  }
};

export default modal;
