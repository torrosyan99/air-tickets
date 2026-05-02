import PolygonSvg from '@icons/polygon.svg?react';
import RubSvg from '@icons/rub.svg?react';

export const TicketsFourth = ({ departure }) => {
  const fourthClass = departure?.price_info?.fourth;
  const seatsInfo = departure?.available_seats_info?.fourth ?? 0;

  const prices = [
    fourthClass?.top_price,
    fourthClass?.bottom_price,
  ].filter((p) => typeof p === 'number');

  const minPrice = prices.length ? Math.min(...prices) : null;

  const formatPrice = (price) =>
    typeof price === 'number' ? price.toLocaleString('ru-RU') : '—';

  return (
    <div className="tickets__flex">
      <p className="tickets__place-type">Сидящий</p>

      <div className="tickets__places-count">
        <span>{seatsInfo}</span>

        <div className="tickets__places">
          <PolygonSvg className="tickets__places-icon" />

          <div className="tickets__places-item">
            <span>верхние</span>
            <div className="tickets__price">
              <span>{formatPrice(fourthClass?.top_price)}</span>
              <RubSvg />
            </div>
          </div>

          <div className="tickets__places-item">
            <span>нижние</span>
            <div className="tickets__price">
              <span>{formatPrice(fourthClass?.bottom_price)}</span>
              <RubSvg />
            </div>
          </div>
        </div>
      </div>

      <div className="tickets__price">
        от <span>{minPrice !== null ? formatPrice(minPrice) : '—'}</span>{' '}
        <RubSvg />
      </div>
    </div>
  );
};