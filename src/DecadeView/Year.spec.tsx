import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Year from './Year';

const tileProps = {
  activeStartDate: new Date(2018, 0, 1),
  classes: ['react-calendar__tile'],
  date: new Date(2018, 0, 1),
  onClick: () => {
    // Intentionally empty
  },
  onMouseOver: () => {
    // Intentionally empty
  },
  point: 2018,
};

describe('Year', () => {
  it('applies given classNames properly', () => {
    const { container } = render(
      <Year
        {...tileProps}
        classes={['react-calendar__tile', 'react-calendar__tile--flag']}
        tileClassName={() => 'testFunctionClassName'}
      />,
    );

    const wrapper = container.querySelector('.react-calendar__tile');

    expect(wrapper).toHaveClass('react-calendar__tile');
    expect(wrapper).toHaveClass('react-calendar__tile--flag');
    expect(wrapper).toHaveClass('react-calendar__decade-view__years__year');
    expect(wrapper).toHaveClass('testFunctionClassName');
  });

  it('renders component without abbreviation', () => {
    const { container } = render(<Year {...tileProps} date={new Date(2018, 0, 1)} />);

    const abbr = container.querySelector('abbr');

    expect(abbr).not.toBeInTheDocument();
    expect(container).toHaveTextContent('2018');
  });

  it("is disabled when date is before beginning of minDate's year", () => {
    const { container } = render(
      <Year {...tileProps} date={new Date(2018, 0, 1)} minDate={new Date(2019, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeDisabled();
  });

  it("is not disabled when date is after beginning of minDate's year", () => {
    const { container } = render(
      <Year {...tileProps} date={new Date(2018, 0, 1)} minDate={new Date(2018, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeEnabled();
  });

  it("is disabled when date is after end of maxDate's year", () => {
    const { container } = render(
      <Year {...tileProps} date={new Date(2018, 0, 1)} maxDate={new Date(2017, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeDisabled();
  });

  it("is not disabled when date is before end of maxDate's year", () => {
    const { container } = render(
      <Year {...tileProps} date={new Date(2018, 0, 1)} maxDate={new Date(2018, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeEnabled();
  });

  it('calls onClick callback when clicked and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onClick = vi.fn();

    const { container } = render(<Year {...tileProps} date={date} onClick={onClick} />);

    fireEvent.click(container.querySelector('.react-calendar__tile') as HTMLDivElement);

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(date, expect.any(Object));
  });

  it('calls onMouseOver callback when hovered and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = vi.fn();

    const { container } = render(<Year {...tileProps} date={date} onMouseOver={onMouseOver} />);

    const tile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    fireEvent.mouseOver(tile);

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when focused and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = vi.fn();

    const { container } = render(<Year {...tileProps} date={date} onMouseOver={onMouseOver} />);

    const tile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    fireEvent.focus(tile);

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('renders tileContent properly', () => {
    const { container } = render(
      <Year {...tileProps} tileContent={<div className="testContent" />} />,
    );

    const testContent = container.querySelector('.testContent');

    expect(testContent).toBeInTheDocument();
  });

  it('renders tileContent function result properly and sends proper arguments to it', () => {
    const date = new Date(2018, 0, 1);
    const tileContent = vi.fn();
    tileContent.mockReturnValue(<div className="testContent" />);

    const { container } = render(<Year {...tileProps} date={date} tileContent={tileContent} />);

    const testContent = container.querySelector('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({
      activeStartDate: tileProps.activeStartDate,
      date,
      view: 'decade',
    });
    expect(testContent).toBeInTheDocument();
  });

  it('uses formatYear if given', () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatYear = vi.fn();
    formatYear.mockReturnValue('Mock format');

    const { container } = render(
      <Year {...tileProps} date={date} formatYear={formatYear} locale={locale} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(formatYear).toHaveBeenCalled();
    expect(formatYear).toHaveBeenCalledWith(locale, date);
    expect(tile).toHaveTextContent('Mock format');
  });
});
