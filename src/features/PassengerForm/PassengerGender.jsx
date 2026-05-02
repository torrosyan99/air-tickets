import {cn} from "@/shared/utils/cn/cn.js"
import {useDispatch} from "react-redux";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";

export const PassengerGender = ({seat}) => {
  const dispatch = useDispatch();


  const handleClick = (gender) => dispatch(
    ticketActions.changePersonInfo({value:gender, name:'gender' ,
      direction: seat.direction, seat_number: seat.seat_number}));
  return (
    <div className={'passenger-form__item'}>
      <label className={'passenger-form__label'}>
        Пол
      </label>
    <div className={'passenger-form__gender'}>
      <button className={cn('passenger-form__gender-button', [], {
        'passenger-form__gender-button--active':  seat.person_info.gender
      })} onClick={() => handleClick(true)}>
        М
      </button>
      <button className={cn('passenger-form__gender-button', [], {
        'passenger-form__gender-button--active':  !seat.person_info.gender
      })} onClick={() => handleClick(false)}>
        Ж
      </button>
    </div>
    </div>
  );
};
