import PolygonSvg from '@icons/polygon.svg?react';
import RubSvg from '@icons/rub.svg?react';

export const TicketsSecond = ({ departure }) => {
  const secondClass = departure?.price_info?.second;
  const seatsInfo = departure?.available_seats_info?.second ?? 0;

  const prices = [
    secondClass?.top_price,
    secondClass?.bottom_price,
  ].filter((p) => typeof p === 'number');

  const minPrice = prices.length ? Math.min(...prices) : null;

  const formatPrice = (price) =>
    typeof price === 'number' ? price.toLocaleString('ru-RU') : '—';

  return (
    <div className="tickets__flex">
      <p className="tickets__place-type">Купе</p>

      <div className="tickets__places-count">
        <span>{seatsInfo}</span>

        <div className="tickets__places">
          <PolygonSvg className="tickets__places-icon" />

          <div className="tickets__places-item">
            <span>верхние</span>
            <div className="tickets__price">
              <span>{formatPrice(secondClass?.top_price)}</span>
              <RubSvg />
            </div>
          </div>

          <div className="tickets__places-item">
            <span>нижние</span>
            <div className="tickets__price">
              <span>{formatPrice(secondClass?.bottom_price)}</span>
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