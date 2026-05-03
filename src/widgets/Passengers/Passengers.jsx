import './Passengers.css'
import {useDispatch, useSelector} from "react-redux";
import {activeSeatsSelector, seatsSelector} from "@/entities/train/model/selectors.jsx";
import {PassengerForm} from "@/features/PassengerForm/PassengerForm.jsx";
import {Button} from '@/shared/ui/Button/Button.jsx'
import {AddPassenger} from "@/features/AddPassenger/AddPassenger.jsx";
import {useFieldArray, useForm} from "react-hook-form";
import OrangePlusSvg from "@icons/orange-plus.svg?react";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";
import {useNavigate} from "react-router-dom";
import {PagePaths} from "@/shared/configs/routerConfig/routerConfig.jsx";


function findEmptyPlace (seats) {
  let activePlace = null;

  for (let i = 0; i < seats.length; i++) {
    const w = seats[i];
    const index = w.seats.findIndex(s => s.available && !s.isActive)
    if (index != '-1') {
      activePlace = w.seats[index].index;
      break;
    }
  }
  return activePlace;
}

export const Passengers = () => {
  const seats = useSelector(seatsSelector)
  const departureSeats = useSelector(activeSeatsSelector) || [];
  const arrivalSeats = useSelector((state) =>
    activeSeatsSelector(state, 'arrival')
  ) || [];
  const dispatch = useDispatch();
const navigate = useNavigate();
  const data = [...arrivalSeats, ...departureSeats];

  const {
    trigger,
    watch,
    setValue,
    control,
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: "onChange",
    defaultValues: {

      passengers: data.map((seat) => ({
        coach_id: seat.coach_id,
        firstName: '',
        lastName: '',
        patronymic: '',
        seat_number: seat.seat_number,
        direction: seat.direction,
        type: seat.is_child ? 'Детский' : 'Взрослый',
        gender: true,
        document_series: '',
        document_number: '',
        document_data: ''
      })),
    },
  });

  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = (data) => {
    dispatch(ticketActions.updateSeatsTwo({
      data:data.passengers
    }));

    navigate(PagePaths.PAYMENT)
  };


  return (
    <section className="passengers">

      <form className={'passengers__form'} onSubmit={handleSubmit(onSubmit)}>

        {fields.map((filed, index) => (
          <PassengerForm
            errors={errors}
            watch={watch}
            setValue={setValue}
            filed={filed}
            control={control}
            key={`${filed.id || index}`}
            index={index}
            register={register}
            remove={remove}
            trigger={trigger}
            count={index + 1}
          />
        ))}
        <button className={'add-passenger'} onClick={() => {
          const emptyPlace = findEmptyPlace(seats);

          const newPassenger = {
            firstName: '',
            lastName: '',
            patronymic: '',
            seat_number: emptyPlace,
            direction: 'departure',
            type: 'Взрослый',
            gender: true,
            document_series: '',
            document_number: '',
            document_data: ''
          };

          append(newPassenger);

          dispatch(ticketActions.addSeat({
             emptyPlace,
            direction: newPassenger.direction,
          }));
        }} type={'button'}>
          Добавить пассажира
          <OrangePlusSvg/>
        </button>


        <Button disabled={!isValid} className={'passengers__button'} color={'white'} size={'lg'}>ДАЛЕЕ</Button>
      </form>


    </section>
  );
};