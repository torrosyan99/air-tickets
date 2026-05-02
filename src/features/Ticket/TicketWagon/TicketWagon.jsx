import {useState} from "react";
import {TicketWagonInfo} from "./TicketWagonInfo.jsx";
import {seatsSelector} from "@/entities/train/model/selectors.jsx";
import {useSelector} from "react-redux";
import {TicketTypes} from "./TicketTypes.jsx";
import {TicketWagonsNames} from "@/features/Ticket/TicketWagon/TicketWagonsNames.jsx";
import {TicketSchema} from "@/features/Ticket/TicketSchema/TicketSchema.jsx";


export const TicketWagon = ({passengers, arrival}) => {
  const seats = useSelector((state) => seatsSelector(state, arrival && 'arrival'));

  const [activeType, setActiveType] = useState('');
  const [activeWagons, setActiveWagons] = useState([]);


  return (
    <div className="ticket__wagon">
      <h3 className="ticket__item-title">Тип вагона</h3>

      <TicketTypes
        activeType={activeType}
        setActiveType={setActiveType}
        arrival={arrival}
        setActiveWagons={setActiveWagons}/>
      {activeType && (
        <>
          <TicketWagonsNames setActiveWagons={setActiveWagons} activeWagons={activeWagons} activeType={activeType}/>

          {
            seats.filter(({coach}) => activeWagons.includes(coach.name)).map((wagon) =>
              <>
                <TicketWagonInfo wagon={wagon} arrival={arrival}/>
                <TicketSchema wagon={wagon} type={activeType} passengers={passengers} arrival={arrival}/>
              </>)}

        </>
      )}
    </div>
  );
};