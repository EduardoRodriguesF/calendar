import { Reducer } from 'redux';
import { IEventsState } from './types';

const INITIAL_STATE: IEventsState = {
  events: [],
};

const events: Reducer<IEventsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_EVENT': {
      const { data } = action.payload;

      return {
        events: [...state.events, data],
      };
    }
    default: {
      return state;
    }
  }
};

export default events;
