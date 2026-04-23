import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import CalendarNextSvg from "@icons/calendar-next.svg?react";
import CalendarPrevSvg from "@icons/calendar-prev.svg?react";
import "./Calendar.css";

const CustomButton = forwardRef(({ value, onClick }, ref) => (
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
  </div>
));

export const Calendar = ({ date, minDate, setDate }) => {
  return (
    <DatePicker
       selected={date}
      onChange={setDate}
      minDate={minDate || new Date()}
      customInput={<CustomButton />}
      renderCustomHeader={({
                             date,
                             decreaseMonth,
                             increaseMonth,
                             prevMonthButtonDisabled,
                             nextMonthButtonDisabled,
                           }) => (
        <div className="calendar__top">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <CalendarPrevSvg />
          </button>

          <div className="calendar__month">
            {date.toLocaleString("default", { month: "long" })}
          </div>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <CalendarNextSvg />
          </button>
        </div>
      )}
    />
  );
};