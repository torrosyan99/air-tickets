import PolygonSvg from '@icons/polygon.svg?react';
import RubSvg from '@icons/rub.svg?react';

export const TicketsFirst = ({ departure }) => {
  const firstClass = departure?.price_info?.first;
  const seatsInfo = departure?.available_seats_info?.first ?? 0;

  const prices = [
    firstClass?.price,
    firstClass?.top_price,
    firstClass?.bottom_price,
  ].filter((p) => typeof p === 'number');

  const minPrice = prices.length ? Math.min(...prices) : null;

  const formatPrice = (price) =>
    typeof price === 'number' ? price.toLocaleString('ru-RU') : '—';

  return (
    <div className="tickets__flex">
      <p className="tickets__place-type">Люкс</p>

      <div className="tickets__places-count">
        <span>{seatsInfo}</span>

        <div className="tickets__places">
          <PolygonSvg className="tickets__places-icon" />

          <div className="tickets__places-item">
            <span>верхние</span>
            <div className="tickets__price">
              <span>{formatPrice(firstClass?.top_price)}</span>
              <RubSvg />
            </div>
          </div>

          <div className="tickets__places-item">
            <span>нижние</span>
            <div className="tickets__price">
              <span>{formatPrice(firstClass?.bottom_price)}</span>
              <RubSvg />
            </div>
          </div>
        </div>
      </div>

      <div className="tickets__price">
        от{' '}
        <span>{minPrice !== null ? formatPrice(minPrice) : '—'}</span>{' '}
        <RubSvg />
      </div>
    </div>
  );
};