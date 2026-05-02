import TrainSvg from "@icons/train-2.svg?react";
import ArrowRightSvg from "@icons/arrow-right.svg?react";
import {formateHours, formateHoursInText} from "@/shared/utils/formateHours/formateHours.js";
import TicketArrowRightSvg from "@icons/ticket-arrow-right.svg?react";
import OclockSvg from "@icons/oclock.svg?react";

export const TicketInfo = ({activeTicket}) => {
  const result = formateHoursInText(activeTicket.duration)
  return (
    <div className={'ticket__info'}>
      <div className={'ticket__info-item'}>
        <TrainSvg className="ticket__info-icon"/>
        <div className={'ticket__info-wrapper'}>
          <h5 className={'ticket__train-title'}>{activeTicket.train.name}</h5>
          <div className={'ticket__direction'}>
            <span>{activeTicket.from.city.name}</span> <ArrowRightSvg/> <br/>
            <span>{activeTicket.to.city.name}</span>
          </div>
        </div>

      </div>
      <div className={'ticket__info-item'}>
        <div className={'ticket__graphic'}>
          <div className={'ticket__graphic-item'}>
            <p className={'ticket__graphic-hours'}>
              {formateHours(activeTicket.from.datetime)}
            </p>
            <p className={'ticket__graphic-place'}>
              {activeTicket.from.city.name} <br/>
              <span>{activeTicket.from.railway_station_name} вокзал</span>
            </p>
          </div>
          <TicketArrowRightSvg/>
          <div className={'ticket__graphic-item'}>
            <p className={'ticket__graphic-hours'}>
              {formateHours(activeTicket.to.datetime)}
            </p>
            <p className={'ticket__graphic-place'}>
              {activeTicket.to.city.name} <br/>
              <span>{activeTicket.to.railway_station_name} вокзал</span>
            </p>
          </div>

        </div>

      </div>
      <div className={'ticket__info-item ticket__duration'}>
        <OclockSvg/>
        <div className={'ticker__hours'}>
          {result[0]} <br/>
          {result[1]}
        </div>
      </div>
    </div>
  );
};
