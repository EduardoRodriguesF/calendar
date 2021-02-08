export function updateSelectedDate(selected: Date) {
  return {
    type: 'UPDATE_SELECTED_DATE',
    payload: {
      selected,
    },
  };
}

export function mockTodayDate(today: Date) {
  return {
    type: 'MOCK_TODAY_DATE',
    payload: {
      today,
    },
  };
}
