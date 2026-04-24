import { Calendar } from '@/shared/ui/Calendar/Calendar.jsx';

export const BookingDate = ({ data, setData }) => {
  const changeDate = (date, key) => setData({ ...data, [key]: date });

  return (
    <div className={'booking__date'}>
      <h3 className={'booking__title'}>Дата</h3>
      <div className={'booking__wrapper'}>
        <Calendar
          date={data.startDate}
          maxDate={data.endDate}
          setDate={(date) => changeDate(date, 'startDate')}
        />
        <Calendar
          date={data.endDate}
          minDate={data.startDate}
          setDate={(date) => changeDate(date, 'endDate')}
        />
      </div>
    </div>
  );
};
