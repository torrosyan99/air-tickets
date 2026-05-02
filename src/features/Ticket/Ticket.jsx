import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from '@/shared/ui/Button/Button.jsx';
import {TicketRoute} from "./TicketRoute.jsx";
import {useTickets} from "@/shared/hooks/useTickets/useTickets.jsx";
import {getSeats} from "@/entities/train/thunks/getSeats.js";
import {activeSeatsSelector, seatsSelector} from "@/entities/train/model/selectors.jsx";
import {PagePaths} from "@/shared/configs/routerConfig/routerConfig.jsx";
import {useNavigate} from "react-router-dom";

import './Ticket.css';

export const Ticket = ({id}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const seats = useSelector(((state) => seatsSelector(state, 'departure')));
  const activeSeats = useSelector(((state) => activeSeatsSelector(state, 'departure')));
  const activeArrivalSeats = useSelector(((state) => activeSeatsSelector(state, 'arrival')));
  const {data} = useTickets();
  const activeTicket = data?.items.find(ticket => ticket.departure._id === id);
  const [passengers, setPassengers] = useState({
    old: 0,
    children: 0,
    children_without_place: 0
  });
  const [arrivalPassengers, setArrivalPassengers] = useState({
    old: 0,
    children: 0,
    children_without_place: 0
  });

  const isDepartureValid =
    passengers.old + passengers.children > 0 &&
    passengers.old + passengers.children === activeSeats?.length;

  const isArrivalValid =
    !activeTicket?.arrival
      ? true
      : arrivalPassengers.old + arrivalPassengers.children > 0 &&
      arrivalPassengers.old + arrivalPassengers.children === activeArrivalSeats?.length;

  const disabled = !(isDepartureValid && isArrivalValid);
  useEffect(() => {
    if(activeTicket)
    dispatch(getSeats({id, ticket:activeTicket}));
  }, [activeTicket]);


  const handleClick = () => {
    navigate(PagePaths.PASSENGERS)
  }

  return (
    <section className="ticket">
      {seats.length > 0 && <> <h3 className={'ticket__title'}>Выбор мест</h3>
        <TicketRoute
          passengers={passengers}
          setPassengers={setPassengers}
          activeTicket={activeTicket?.departure}
          id={id}/>
        {activeTicket?.arrival && <TicketRoute
          passengers={arrivalPassengers}
          setPassengers={setArrivalPassengers}
          arrival
          activeTicket={activeTicket.arrival}
          id={id}/>}
        <Button className={'ticket__button'} disabled={disabled} onClick={handleClick} >
          Найти
        </Button></>}
    </section>
  );
};
