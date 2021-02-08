export function updateSelectedDate(selectedDate: Date) {
  return {
    type: 'UPDATE_SELECTED_DATE',
    payload: {
      selectedDate,
    },
  };
}

export function mockTodayDate(todayDate: Date) {
  return {
    type: 'MOCK_TODAY_DATE',
    payload: {
      todayDate,
    },
  };
}
