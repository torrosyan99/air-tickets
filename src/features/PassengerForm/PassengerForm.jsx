import './PassengerForm.css'
import PassengerCloseSvg from "@icons/passenger-close.svg?react"
import PassengerOpenSvg from "@icons/passenger-open.svg?react"
import CloseSvg from "@icons/close.svg?react"
import {act, useEffect, useRef, useState} from "react";
// import {SimpleSelect} from "@/shared/ui/SimpleSelect/SimpleSelect.jsx";
import {useDispatch} from "react-redux";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";
import {PassengerName} from "./PassengerName.jsx";
import {SimpleSelect} from "@/shared/ui/SimpleSelect/SimpleSelect.jsx";
// import {PassengerGender} from "./PassengerGender.jsx";
// import {PassengerBirthday} from "./PassengerBirthday.jsx";
// import {PassengerDocument} from "./PassengerDocument.jsx";
// import {Checkbox} from "@/shared/ui/Checkbox/Checkbox.jsx";
// import {Button} from "@/shared/ui/Button/Button.jsx"
// import {activeSeatsSelector} from "@/entities/train/model/selectors.jsx";
import ErrorSvg from "@icons/error-icon.svg?react"
import SuccessSvg from "@icons/success-icon.svg?react"
import {Controller, useWatch} from "react-hook-form";
import {PassengerGender} from "@/features/PassengerForm/PassengerGender.jsx";
import {PassengerBirthday} from "@/features/PassengerForm/PassengerBirthday.jsx";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox.jsx";
import {PassengerDocument} from "@/features/PassengerForm/PassengerDocument.jsx";
import {Button} from "@/shared/ui/Button/Button.jsx";
import {cn} from "@/shared/utils/cn/cn.js";

const getFirstErrorMessage = (errors) => {
  if (!errors) return null;

  for (const key in errors) {
    if (errors[key]?.message) return errors[key].message;

    if (typeof errors[key] === "object") {
      const nested = getFirstErrorMessage(errors[key]);
      if (nested) return nested;
    }
  }

  return null;
};

export const PassengerForm = ({filed, errors,
                                trigger,
                                watch, setValue,
                                remove, register,
                                control,
                                index, count}) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => setIsOpen(!isOpen);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const type = useWatch({
    control,
    name: `passengers.${index}.type`,
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    dispatch(ticketActions.changeAge({
      seat_number: filed.seat_number,
      age: type,
      direction: filed.direction,
    }));
  }, [type]);

  return (
    <div className={cn("passenger-form", [], {
      'passenger-form--closed': !isOpen,
    })}>
      <div className={'passenger-form__top'}>
        <button className={'passenger-form__top-button'} type={'button'} onClick={handleClick}>
          {isOpen ? <PassengerCloseSvg/> : <PassengerOpenSvg/>}
        </button>
        <span> Пассажир {count}</span>
        <button className={'passenger-form__delete'} type={'button'} onClick={() => {
          remove(index)
          dispatch(ticketActions.deleteSeat({
            seat_number: filed.seat_number,
            direction: filed.direction,
          }))
        }}>
          <CloseSvg/>
        </button>

      </div>
      <div className={'passenger-form__content'}>
        <div className={'passenger-form__select-wrapper'}>
          <Controller
            control={control}
            name={`passengers.${index}.type`}
            defaultValue="Взрослый"
            rules={{required: true}}
            render={({field}) => (
              <SimpleSelect
                className={'passenger-form__select'}
                buttonClass={'passenger-form__select-button'}
                value={field.value}
                options={['Взрослый', "Детский"]}
                onChange={field.onChange}
              />

            )}
          />

        </div>
        <PassengerName errors={errors} remove={remove} register={register} index={index}/>
        <div className={'passenger-form__wrapper'}>
          <PassengerGender control={control} remove={remove} register={register} index={index}/>
          <PassengerBirthday control={control} index={index}/>
        </div>
        <div className={'passenger-form__checkbox'}>

          <Checkbox
            checked={checked}
            onClick={setChecked}
            label={'ограниченная подвижность'}/>
        </div>

        <PassengerDocument errors={errors} trigger={trigger} setValue={setValue} control={control} index={index}
                           register={register} watch={watch}/>
        <div className={'passenger-form__bottom'}>
          <Button
            type={'button'}
            onClick={async () => {
              console.log(`passengers.${index}`)
              const isValid = await trigger(`passengers.${index}`);

              if (isValid) {
                setShow(true)
              } else {
                setShow(true);
              }
              setTimeout(() => {
                setShow(false);
              }, 2000)
            }}
            className={'passenger-form__button'}
            size={'xl'} variant={'black-ghost'}>Следующий пассажир</Button>

          {errors?.passengers?.[index] && show &&
            <div className={'passenger-form__error'}>

              <ErrorSvg/>
              <p className={
                'passenger-form__error-text'
              }>{getFirstErrorMessage(errors) === 'Формат: VIII-ЫП-123456' ? <>
                Номер свидетельства о рожденни указан некорректно <br/>
                Пример: <span>VIII-ЫП-123456</span>
              </> : getFirstErrorMessage(errors)}</p>
            </div>}
          {show && <div className={'passenger-form__ok'}>

            <SuccessSvg/>
            <p className={
              'passenger-form__ok-text'
            }>Готово</p>
          </div>}
        </div>

      </div>
    </div>
  );
};
