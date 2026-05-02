import './AddPassenger.css'
import OrangePlusSvg from '@icons/orange-plus.svg?react';
import {useDispatch} from "react-redux";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";

export const AddPassenger = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(ticketActions.addSeat())
  return (
    <button className={'add-passenger'} onClick={handleClick} type={'button'}>
      Добавить пассажира
      <OrangePlusSvg />
    </button>
  );
};
