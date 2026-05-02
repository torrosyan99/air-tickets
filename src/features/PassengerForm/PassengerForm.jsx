import './PassengerForm.css'
import PassengerCloseSvg from "@icons/passenger-close.svg?react"
import PassengerOpenSvg from "@icons/passenger-open.svg?react"
import CloseSvg from "@icons/close.svg?react"
import {useState} from "react";
import {SimpleSelect} from "@/shared/ui/SimpleSelect/SimpleSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";
import {PassengerName} from "./PassengerName.jsx";
import {PassengerGender} from "./PassengerGender.jsx";
import {PassengerBirthday} from "./PassengerBirthday.jsx";
import {PassengerDocument} from "./PassengerDocument.jsx";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox.jsx";
import {Button} from "@/shared/ui/Button/Button.jsx"
import {activeSeatsSelector} from "@/entities/train/model/selectors.jsx";
import ErrorSvg from "@icons/error-icon.svg?react"

export const PassengerForm = ({seat, count}) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const activeSeats = useSelector(state => activeSeatsSelector(state, seat.direction))
  const [checked, setChecked] = useState(false);


  const [error, setError] = useState(false);
  const handleChange = (value) => dispatch(
    ticketActions.changeAge({age: value, direction: seat.direction, seat_number: seat.seat_number}));

  const handleDelete = () => {

    dispatch(ticketActions.deleteSeat({
      direction: seat.direction,
      seat_number: seat.seat_number,
    }))
  }

  return (
    <div className="passenger-form">
      <div className={'passenger-form__top'}>
        <button className={'passenger-form__top-button'} onClick={handleClick}>
          {isOpen ? <PassengerCloseSvg/> : <PassengerOpenSvg/>}
        </button>
        <span> Пассажир {count}</span>
        {activeSeats.length > 1 && <button className={'passenger-form__delete'} onClick={handleDelete}>
          <CloseSvg/>
        </button>}

      </div>
      {isOpen && <>
        <div className={'passenger-form__select-wrapper'}>
          <SimpleSelect className={'passenger-form__select'} buttonClass={'passenger-form__select-button'}
                        value={seat.is_child ? 'Детский' : 'Взрослый'}
                        onChange={handleChange}
                        options={['Взрослый', "Детский"]}>

          </SimpleSelect>
        </div>
        <PassengerName seat={seat}/>
        <div className={'passenger-form__wrapper'}>
          <PassengerGender seat={seat}/>
          <PassengerBirthday seat={seat}/>
        </div>
        <div className={'passenger-form__checkbox'}>

          <Checkbox checked={checked} onClick={setChecked} label={'ограниченная подвижность'}/>
        </div>

        <PassengerDocument seat={seat}/>
        <div className={'passenger-form__bottom'}>
          <Button
            onClick={() => {

              if (seat.person_info.document_type !== 'паспорт' &&
                !(/^([IVXLCDM]+)\sУН\s\d{6}$/.test(seat.person_info.document_data))) {
                setError('Номер свидетельства о рожденни указан некорректно Пример: VIII-ЫП-123456');
                setTimeout(() => {
                  setError('')
                }, 2000)
                return
              }



            }


            }
            className={'passenger-form__button'}
            size={'xl'} variant={'black-ghost'}>Следующий пассажир</Button>

          {error.length > 0 && <div className={'passenger-form__error'}>

            <ErrorSvg/>
            <p className={
              'passenger-form__error-text'
            }>{error}</p>
          </div>}
        </div>

      </>}
    </div>
  );
};
