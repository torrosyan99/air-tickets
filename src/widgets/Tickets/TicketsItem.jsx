import { TicketsGraphic } from './TicketsGraphic.jsx';
import { TicketsInfo } from './TicketsInfo.jsx';
import { TicketsPrices } from './TicketsPrices.jsx';


export const TicketsItem = ({ departure, arrival, children }) => {

  return (
    <li className="ticket tickets__item">
      <TicketsInfo departure={departure}/>
      <TicketsGraphic departure={departure} arrival={arrival}/>
      <TicketsPrices departure={departure}>{children}</TicketsPrices>
    </li>
  );
};


