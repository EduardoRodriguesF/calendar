import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Calendar from '../../components/Calendar';

const getNow = () => new Date(Date.now());

describe('Calendar component', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2021-02-14T11:01:58.135Z').valueOf());
  });

  it('should be able to render current month (February)', () => {
    const { getByTestId } = render(<Calendar date={getNow()} />);

    expect(getByTestId('date_display')).toHaveTextContent('February 2021');
    expect(getByTestId('31')).toHaveClass('otherMonth');
    expect(getByTestId('16')).toBeTruthy();
  });

  it("should highlight today's date", () => {
    const { getByTestId } = render(<Calendar date={getNow()} />);

    expect(getByTestId('14')).toHaveClass('today');
  });

  it('should highlight date when clicking', () => {
    const { getByTestId } = render(<Calendar date={getNow()} />);

    const target = getByTestId('26');

    fireEvent.click(target);

    expect(target).toHaveClass('selected');
  });

  it('should be able to change to next month', () => {
    const { getByTestId } = render(<Calendar date={getNow()} />);

    fireEvent.click(getByTestId('next_month'));

    expect(getByTestId('date_display')).toHaveTextContent('March 2021');
    expect(getByTestId('31')).not.toHaveClass('otherMonth');
  });

  it('should be able to change to previous month', () => {
    const { getByTestId } = render(<Calendar date={getNow()} />);

    fireEvent.click(getByTestId('previous_month'));

    expect(getByTestId('date_display')).toHaveTextContent('January 2021');
  });

  it('should be able to go to previous year', () => {
    const { getByTestId } = render(<Calendar date={getNow()} />);

    fireEvent.click(getByTestId('previous_month'));
    sleep(200);
    fireEvent.click(getByTestId('previous_month'));

    expect(getByTestId('date_display')).toHaveTextContent('December 2020');
    expect(getByTestId('31')).not.toHaveClass('otherMonth');

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
});
