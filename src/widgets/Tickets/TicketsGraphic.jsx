import { formateHours } from '@/shared/utils/formateHours/formateHours.js';

import TicketArrowRightSvg from '@icons/ticket-arrow-right.svg?react';
import TicketArrowLeftSvg from '@icons/ticket-arrow-right.svg?react';


export const TicketsGraphic = ({ arrival, departure }) => {
  return (
    <div className={'tickets__item-center'}>
      <div className={'tickets__graphic'}>
        <div className={'tickets__graphic-item'}>
          <p className={'tickets__graphic-hours'}>
            {formateHours(departure.from.datetime)}
          </p>
          <p className={'tickets__graphic-place'}>
            {departure.from.city.name} <br />
            <span>{departure.from.railway_station_name} вокзал</span>
          </p>
        </div>
        <div className={'tickets__duration'}>
          <p className={'tickets__duration-hours'}>
            {formateHours( departure.duration)}
          </p>
          <TicketArrowRightSvg />
        </div>
        <div className={'tickets__graphic-item'}>
          <p className={'tickets__graphic-hours'}>
            {formateHours(departure.to.datetime)}
          </p>
          <p className={'tickets__graphic-place'}>
            {departure.to.city.name} <br />
            <span>{departure.to.railway_station_name}  вокзал</span>
          </p>
        </div>

      </div>

      {arrival && <div className={'tickets__graphic'}>
        <div className={'tickets__graphic-item'}>
          <p className={'tickets__graphic-hours'}>
            {formateHours(arrival.from.datetime)}
          </p>
          <p className={'tickets__graphic-place'}>
            {arrival.from.city.name} <br />
            <span>{arrival.from.railway_station_name} вокзал</span>
          </p>
        </div>
        <div className={'tickets__duration'}>
          <p className={'tickets__duration-hours'}>
            {formateHours( arrival.duration)}
          </p>
          <TicketArrowLeftSvg  />
        </div>
        <div className={'tickets__graphic-item'}>
          <p className={'tickets__graphic-hours'}>
            {formateHours(arrival.to.datetime)}
          </p>
          <p className={'tickets__graphic-place'}>
            {arrival.to.city.name} <br />
            <span>{arrival.to.railway_station_name} вокзал</span>
          </p>
        </div>

      </div>}
    </div>
  );
};
