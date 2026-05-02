import PolygonSvg from '@icons/polygon.svg?react';
import RubSvg from '@icons/rub.svg?react';

export const TicketsThird = ({ departure }) => {
  const thirdClass = departure?.price_info?.third;
  const seatsInfo = departure?.available_seats_info?.third ?? 0;

  const prices = [
    thirdClass?.top_price,
    thirdClass?.bottom_price,
    thirdClass?.side_price,
  ].filter((p) => typeof p === 'number');

  const minPrice = prices.length ? Math.min(...prices) : null;

  const formatPrice = (price) =>
    typeof price === 'number' ? price.toLocaleString('ru-RU') : '—';

  return (
    <div className="tickets__flex">
      <p className="tickets__place-type">Плацкарт</p>

      <div className="tickets__places-count">
        <span>{seatsInfo}</span>

        <div className="tickets__places">
          <PolygonSvg className="tickets__places-icon" />

          <div className="tickets__places-item">
            <span>верхние</span>
            <div className="tickets__price">
              <span>{formatPrice(thirdClass?.top_price)}</span>
              <RubSvg />
            </div>
          </div>

          <div className="tickets__places-item">
            <span>нижние</span>
            <div className="tickets__price">
              <span>{formatPrice(thirdClass?.bottom_price)}</span>
              <RubSvg />
            </div>
          </div>

          <div className="tickets__places-item">
            <span>боковые</span>
            <div className="tickets__price">
              <span>{formatPrice(thirdClass?.side_price)}</span>
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