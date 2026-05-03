import {TicketServices} from '@/entities/train/TicketServices/TicketServices.jsx';
import {Button} from '@/shared/ui/Button/Button.jsx';

import {TicketsFirst} from './Places/TicketsFirst.jsx';
import {TicketsFourth} from './Places/TicketsFourth.jsx';
import {TicketsSecond} from './Places/TicketsSecond.jsx';
import {TicketsThird} from './Places/TicketsThird.jsx';
import {useTickets} from "@/shared/hooks/useTickets/useTickets.jsx";


export const TicketsPrices = ({departure, children}) => {
  const {searchTicketsWithParams, params} = useTickets()
  const handleClick = () => {
    searchTicketsWithParams({
      id: departure._id,
      ...params,
    });
    window.scrollTo({top: 600, behavior: 'instant'});
  }
  return (
    <div className={'tickets__right'}>
      <div className={'tickets__prices'}>
        {departure.available_seats_info.fourth && <TicketsFourth departure={departure}/>}
        {departure.available_seats_info.third && <TicketsThird departure={departure}/>}
        {departure.available_seats_info.second && <TicketsSecond departure={departure}/>}
        {departure.available_seats_info.first && <TicketsFirst departure={departure}/>}
      </div>
      <TicketServices className={'tickets__services'} {...departure} />
      {children ? children :
        <Button className={'tickets__button'} onClick={handleClick} size={'full-s'} color={'white'}>Выбрать
          места</Button>}
    </div>
  );
};
