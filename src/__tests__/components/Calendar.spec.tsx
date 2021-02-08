import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Calendar from '../../components/Calendar';
import store from '../../store';

const getNow = () => new Date(Date.now());

describe('Calendar component', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2021-02-14T11:01:58.135Z').valueOf());
  });

  it('should be able to render current month (February)', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    expect(getByTestId('date_display')).toHaveTextContent('February 2021');
    expect(getByTestId('31')).toHaveClass('otherMonth');
    expect(getByTestId('16')).toBeTruthy();
  });

  it('should be able to render calendar without date argument', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar />
      </Provider>,
    );

    expect(getByTestId('26')).toBeTruthy();
  });

  it("should highlight today's date", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    expect(getByTestId('14')).toHaveClass('today');
  });

  it("should always have small highlight on today's date", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    fireEvent.click(getByTestId('26'));

    expect(getByTestId('14')).toHaveStyle('background-color: #eaeaea');
  });

  it('should highlight date when clicking', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    fireEvent.click(getByTestId('26'));

    expect(getByTestId('26')).toHaveClass('selected');
  });

  it('should not highlight date from another month', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    fireEvent.click(getByTestId('31'));

    expect(getByTestId('31')).not.toHaveClass('selected');
  });

  it('should be able to change to next month', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    fireEvent.click(getByTestId('next_month'));

    expect(getByTestId('date_display')).toHaveTextContent('March 2021');
    expect(getByTestId('31')).not.toHaveClass('otherMonth');
  });

  it('should be able to change to previous month', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    fireEvent.click(getByTestId('previous_month'));

    expect(getByTestId('date_display')).toHaveTextContent('January 2021');
  });

  it('should be able to go to previous year', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    fireEvent.click(getByTestId('previous_month'));
    sleep(50);
    fireEvent.click(getByTestId('previous_month'));

    expect(getByTestId('date_display')).toHaveTextContent('December 2020');
    expect(getByTestId('31')).not.toHaveClass('otherMonth');

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });

  it('should be able to go to next year', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    for (let i = 0; i < 11; i++) {
      fireEvent.click(getByTestId('next_month'));
      sleep(50);
    }

    expect(getByTestId('date_display')).toHaveTextContent('January 2022');

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });

  it('should not highlight the selected date in past year', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Calendar initialDate={getNow()} />
      </Provider>,
    );

    fireEvent.click(getByTestId('15'));

    expect(getByTestId('15')).toHaveClass('selected');

    for (let i = 0; i < 12; i++) {
      fireEvent.click(getByTestId('previous_month'));
      sleep(50);
    }

    expect(getByTestId('date_display')).toHaveTextContent('February 2020');
    expect(getByTestId('15')).not.toHaveClass('selected');

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
});
