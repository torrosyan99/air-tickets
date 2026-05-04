import { TicketsPagination } from '@/features/TicketsPagination/TicketsPagination.jsx';
import { TicketsSort } from '@/features/TicketsSort/TicketsSort.jsx';
import { useTickets } from '@/shared/hooks/useTickets/useTickets.jsx';
import { TicketCard } from "@/entities/ticket/TicketCard/TicketCard.jsx";
import { Title } from "@/shared/ui/Title/Title.jsx";
import {LoadingForSection} from "@/shared/ui/Loading/LoadingForSection.jsx";

import './Tickets.css';
import {useDispatch, useSelector} from "react-redux";
import {seatsSelector} from "@/entities/ticket/model/selectors.jsx";
import {useEffect} from "react";
import {ticketActions} from "@/entities/ticket/model/ticketSlice.js";

export const Tickets = () => {
  const { data } = useTickets();
  const seats = useSelector(seatsSelector);
const dispatch = useDispatch();

  useEffect(() => {
    if(seats.length > 0){
      dispatch(ticketActions.resetAll())
    }
  }, []);

  if (!data) {
    return (
      <section className="tickets">
        <LoadingForSection />
      </section>
    );
  }

  if (data.total_count === 0 ) {
    return (
      <section className="tickets" id="tickets">
        <Title>Ничего не найдено</Title>
      </section>
    );
  }

  return (
    <section className="tickets" id="tickets">
      <TicketsSort />
      <div className="tickets__list">
        {(data?.items || []).map(item => (
          <TicketCard key={item.departure._id} {...item} />
        ))}
      </div>
      <TicketsPagination />
    </section>
  );
};