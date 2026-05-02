import {Input} from "@/shared/ui/Input/Input.jsx";
import {useDispatch} from "react-redux";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";

export const PassengerName = ({seat}) => {
  const dispatch = useDispatch();
  const handleChange = (e, name) => {
    dispatch(ticketActions.changePersonInfo({
      name,
      value: e.target.value,
      direction: seat.direction, seat_number: seat.seat_number
    }))
  }

  return (
    <div className={'passenger-form__inputs'}>
      <div className={'passenger-form__item'}>
        <label className={'passenger-form__label'}>
          Фамилия
        </label>
        <Input  variant={'small'} value={seat.person_info.first_name} onChange={(e) => handleChange(e, 'first_name')}/>
      </div>
      <div className={'passenger-form__item'}>
        <label className={'passenger-form__label'}>
          Имя
        </label>
        <Input variant={'small'} value={seat.person_info.last_name} onChange={(e) => handleChange(e, 'last_name')}/>
      </div>
      <div className={'passenger-form__item'}>
        <label className={'passenger-form__label'}>
          Отчество
        </label>
        <Input variant={'small'} value={seat.person_info.patronymic} onChange={(e) => handleChange(e, 'patronymic')}/>
      </div>
    </div>

  );
};
