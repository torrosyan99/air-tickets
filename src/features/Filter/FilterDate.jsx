import {Calendar} from "@/shared/ui/Calendar/Calendar.jsx";

export const FilterDate = () => {
  return (
    <div className="filter__block filter__date">
      <div className={'filter__date-item'}>
        <h3 className={'filter__title'}>Дата поездки</h3>
        <Calendar small />
      </div>
      <div className={'filter__date-item'}>
        <h3 className={'filter__title'}>Дата возвращения</h3>
        <Calendar small />
      </div>
    </div>
  );
};
