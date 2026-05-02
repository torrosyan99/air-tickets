import './Passengers.css'
import {useSelector} from "react-redux";
import {activeSeatsSelector} from "@/entities/train/model/selectors.jsx";
import {PassengerForm} from "@/features/PassengerForm/PassengerForm.jsx";
import {Button} from '@/shared/ui/Button/Button.jsx'
import {AddPassenger} from "@/features/AddPassenger/AddPassenger.jsx";

export const isPassengerValid = (seat) => {
  const { person_info } = seat;

  if (!person_info) return false;

  let documentData = person_info.document_type !== 'паспорт' && /^([IVXLCDM]+)\sУН\s\d{6}$/.test(person_info.document_data)


  return (
    Boolean(person_info.first_name?.trim()) &&
    Boolean(person_info.last_name?.trim()) &&
    Boolean(person_info.birthday?.trim()) &&
    Boolean(person_info.document_data?.trim()) &&
      documentData
  );
};
export const areAllPassengersValid = (seats) => {
  return seats.every(isPassengerValid);
};
export const Passengers = () => {
  const departureSeats = useSelector(activeSeatsSelector) || [];
  const arrivalSeats = useSelector((state) =>
    activeSeatsSelector(state, 'arrival')
  ) || [];
  const data = [...arrivalSeats, ...departureSeats];

  const isValid = areAllPassengersValid(data)

  return (
    <section className="passengers">

      {data.map((seat, index) => (
        <PassengerForm
          key={`${seat.id || index}`}
          seat={seat}
          count={index + 1}
        />
      ))}
      <AddPassenger />


      <Button disabled={!isValid} className={'passengers__button'} color={'white'} size={'lg'}>ДАЛЕЕ</Button>


    </section>
  );
};