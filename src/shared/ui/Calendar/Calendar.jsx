import CalendarNextSvg from '@icons/calendar-next.svg?react';
import CalendarPrevSvg from '@icons/calendar-prev.svg?react';
import {forwardRef} from 'react';
import DatePicker from 'react-datepicker';
import CalendarSvg from "@icons/calendar.svg?react"
import './Calendar.css';

const CustomButton = forwardRef(({value, onClick}, ref) => (
  <div className="calendar__wrapper">
    <input
      ref={ref}
      type="text"
      value={value || ''}
      onClick={onClick}
      readOnly
      placeholder="ДД/ММ/ГГ"
      className="calendar__input"
    />
    <CalendarSvg className="calendar__icon"/>
  </div>
));

export const Calendar = ({date, minDate, maxDate, setDate}) => {
  return (
    <DatePicker
      selected={date}
      onChange={setDate}
      minDate={minDate || new Date()}
      maxDate={maxDate}
      customInput={<CustomButton/>}
      dateFormat="dd/MM/yyyy"
      renderCustomHeader={({
                             date,
                             decreaseMonth,
                             increaseMonth,
                             prevMonthButtonDisabled,
                             nextMonthButtonDisabled,
                           }) => (
        <div className="calendar__top">
          <button onClick={decreaseMonth} type={'button'} disabled={prevMonthButtonDisabled}>
            <CalendarPrevSvg/>
          </button>

          <div className="calendar__month">
            {date.toLocaleString('default', {month: 'long'})}
          </div>

          <button onClick={increaseMonth} type={'button'} disabled={nextMonthButtonDisabled}>
            <CalendarNextSvg/>
          </button>
        </div>
      )}
    />
  );
};