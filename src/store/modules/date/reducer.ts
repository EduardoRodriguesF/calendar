import { Reducer } from 'redux';
import { IDateState } from './types';

const INITIAL_STATE: IDateState = {
  todayDate: new Date(),
  selectedDate: new Date(),
  dateMonth: new Date().getMonth(),
  dateYear: new Date().getFullYear(),
};

const date: Reducer<IDateState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DATE': {
      const { selectedDate } = action.payload;

      return {
        ...state,
        selectedDate,
      };
    }
    case 'MOCK_TODAY_DATE': {
      const { todayDate } = action.payload;

      return {
        ...state,
        todayDate,
      };
    }
    default: {
      return state;
    }
  }
};

export default date;
