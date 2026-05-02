import { TicketsGraphic } from './TicketsGraphic.jsx';
import { TicketsInfo } from './TicketsInfo.jsx';
import { TicketsPrices } from './TicketsPrices.jsx';


export const TicketsItem = ({ departure, arrival }) => {

  return (
    <li className="tickets__item">
      <TicketsInfo departure={departure}/>
      <TicketsGraphic departure={departure} arrival={arrival}/>
      <TicketsPrices departure={departure}/>
    </li>
  );
};


