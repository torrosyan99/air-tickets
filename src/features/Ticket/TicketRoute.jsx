import RubSvg from '@icons/rub.svg?react';
import ArrowLeftSvg from '@icons/ticket-arrow-left-2.svg?react';
import ArrowRightSvg from '@icons/ticket-arrow-right-2.svg?react';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TicketCounts } from './TicketCounts/TicketCounts.jsx';
import { TicketInfo } from './TicketInfo.jsx';
import { TicketWagon } from './TicketWagon/TicketWagon.jsx';

import {
  activeSeatsSelector,
  priceSelector,
} from '@/entities/ticket/model/selectors.jsx';
import { ticketActions } from '@/entities/ticket/model/ticketSlice.js';
import { useTickets } from '@/shared/hooks/useTickets/useTickets.jsx';
import { Button } from '@/shared/ui/Button/Button.jsx';
import { cn } from '@/shared/utils/cn/cn.js';




export const TicketRoute = ({
                              activeTicket,
                              arrival,
                              passengers,
                              setPassengers,
                            }) => {
  const dispatch = useDispatch();

  const activeSeats = useSelector(activeSeatsSelector);

  const price = useSelector((state) =>
    priceSelector(state, arrival ? 'arrival' : 'departure')
  );

  const { searchTicketsWithParams, params } = useTickets();

  useEffect(() => { if(activeSeats.length > 0)
    dispatch(ticketActions.reset({ direction:arrival && 'arrival' })) },
    [passengers]);

  if (!activeTicket) return null;

  const handleBack = useCallback(() => {
    const newParams = { ...params };
    delete newParams.id;
    searchTicketsWithParams(newParams);
  }, [params, searchTicketsWithParams]);

  return (
    <div
      className={cn('ticket__route', [], {
        'ticket__route--arrival': arrival,
      })}
    >
      <div className="ticket__top">
        {arrival ? <ArrowLeftSvg /> : <ArrowRightSvg />}

        <Button variant="black-ghost" onClick={handleBack}>
          Выбрать другой поезд
        </Button>
      </div>

      <TicketInfo activeTicket={activeTicket} />

      <TicketCounts
        passengers={passengers}
        setPassengers={setPassengers}
      />

      <TicketWagon
        arrival={arrival}
        passengers={passengers}
      />

      {price > 0 && (
        <div className="ticket__price">
          {price}
          <RubSvg width={14} height={17} />
        </div>
      )}
    </div>
  );
};