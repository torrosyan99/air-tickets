
import { TicketsPagination } from '@/features/TicketsPagination/TicketsPagination.jsx';
import { TicketsSort } from '@/features/TicketsSort/TicketsSort.jsx';
import { useTickets } from '@/shared/hooks/useTickets/useTickets.jsx';

import { TicketsItem } from './TicketsItem.jsx';

import './Tickets.css'

export const Tickets = () => {
  const { data } = useTickets();
  return (
    <section className="tickets" id={'tickets'}>

      {data?.total_count === 0 ? <h3 className={'tickets__title'}>
        Ничего не найдено
      </h3> : <>

        <TicketsSort/>
        <ul className="tickets__list">
          {
            data?.items && data?.items.map(item => (
              <TicketsItem key={item.departure._id} {...item} />
            ))
          }
        </ul>
        <TicketsPagination/>

      </>}
    </section>

  );
};
