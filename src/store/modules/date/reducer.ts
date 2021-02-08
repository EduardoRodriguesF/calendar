import { Reducer } from 'redux';
import { IDateState } from './types';

const INITIAL_STATE: IDateState = {
  today: new Date(),
  selected: new Date(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const date: Reducer<IDateState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DATE': {
      const { selected } = action.payload;

      return {
        ...state,
        selected,
      };
    }
    case 'MOCK_TODAY_DATE': {
      const { today } = action.payload;

      return {
        ...state,
        today,
      };
    }
    case 'UPDATE_MONTH': {
      const { month } = action.payload;

      return {
        ...state,
        month,
      };
    }
    case 'UPDATE_YEAR': {
      const { year } = action.payload;

      return {
        ...state,
        year,
      };
    }
    default: {
      return state;
    }
  }
};

export default date;
