import { formateHours } from '@/shared/utils/formateHours/formateHours.js';

import TicketArrowRightSvg from '@icons/ticket-arrow-right.svg?react';
import TicketArrowLeftSvg from '@icons/ticket-arrow-right.svg?react';

const TicketRow = ({ data, ArrowIcon, className }) => (
  <div className={className}>
    <div className={'ticket-card__graphic-item'}>
      <p className={'ticket-card__graphic-hours'}>
        {formateHours(data.from.datetime)}
      </p>
      <p className={'ticket-card__graphic-place'}>
        {data.from.city.name} <br />
        <span>{data.from.railway_station_name} вокзал</span>
      </p>
    </div>

    <div className={'ticket-card__duration'}>
      <p className={'ticket-card__duration-hours'}>
        {formateHours(data.duration)}
      </p>
      <ArrowIcon />
    </div>

    <div className={'ticket-card__graphic-item'}>
      <p className={'ticket-card__graphic-hours'}>
        {formateHours(data.to.datetime)}
      </p>
      <p className={'ticket-card__graphic-place'}>
        {data.to.city.name} <br />
        <span>{data.to.railway_station_name} вокзал</span>
      </p>
    </div>
  </div>
);

export const TicketCardGraphic = ({ arrival, departure }) => {
  return (
    <div className={'ticket-card__center'}>
        <TicketRow
          data={departure}
          ArrowIcon={TicketArrowRightSvg}
          className={'ticket-card__graphic'}
        />

      {arrival && (
        <TicketRow
          data={arrival}
          ArrowIcon={TicketArrowLeftSvg}
          className={'ticket-card__graphic'}

        />
      )}
    </div>
  );
};