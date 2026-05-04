import {TicketCard} from "@/entities/ticket/TicketCard/TicketCard.jsx";
import {Button} from "@/shared/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {paramsSelector, ticketSelector} from "@/entities/ticket/model/selectors.jsx";
import {useNavigate} from "react-router-dom";
import {PagePaths} from "@/shared/configs/routerConfig/routerConfig.jsx";
import {Title} from "@/shared/ui/Title/Title.jsx";

export const ResultTicket = ({ticket}) => {
 const params = useSelector(paramsSelector);
const navigate = useNavigate()
const handleClick = () => {
  navigate(`${PagePaths.TICKETS}?${params}`);
}

  return (


    <div className="result__block">
      <div className="result__block-top">
        <Title className="result__title">Поезд</Title>
      </div>

      <TicketCard departure={ticket.departure} arrival={ticket.arrival}>
        <Button variant="black-ghost" size="sm" onClick={handleClick}>
          Изменить
        </Button>
      </TicketCard>
    </div>
  );
};
