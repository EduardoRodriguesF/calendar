export function updateSelectedDate(selectedDate: Date) {
  return {
    type: 'UPDATE_SELECTED_DATE',
    payload: {
      selectedDate,
    },
  };
}
