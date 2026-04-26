import { IMyCarriageProps } from '../../../../../Training/FE_diploma/src/models/models';
import CarriageNumber from '../../../../../Training/FE_diploma/src/components/CarriageNumber/CarriageNumber';
import CarriageTotalPrice from '../../../../../Training/FE_diploma/src/components/CarriageTotalPrice/CarriageTotalPrice';
import PotentialPassengers from '../../../../../Training/FE_diploma/src/components/PotentialPassengers/PotentialPassengers';

import carriageSeat from '../../../../../Training/FE_diploma/src/assets/carriage-seat.svg';
import './carriageSeat.css';

const CarriageSeat = ({ data }: { data: IMyCarriageProps }) => {
  // деструктурируем данные:
  const {
    isForward,
    baby,
    currentSeats,
    carriage_number,
    top_price,
    bottom_price,
    have_wifi,
    wiFiPrice,
    is_linens_included,
    linensPrice,
    onSeatClick,
  } = data;

  const priceTooltip = () => {
    const price = Math.min(top_price || Infinity, bottom_price || Infinity); // т.к. кривой бэк!!!
    const wifi = have_wifi ? wiFiPrice : 0;
    const linens = !is_linens_included ? linensPrice : 0;

    const priceWithFeatures = price + wifi + linens;

    return baby.isActive ? 0 : priceWithFeatures; // младенцы едут бесплатно !!!
  };

  return (
    <div className="carriage-seat">
      <PotentialPassengers />

      <img className="carriage-seat__img" src={carriageSeat} alt="seat" />

      <CarriageNumber carriageNumber={carriage_number} />

      <ul className="carriage-seat__scheme">
        {currentSeats.map((seat) => (
          <li
            key={seat.index}
            className={`carriage-seat__seat carriage-seat__seat_${seat.index}${
              seat.available ? ' carriage-seat__seat_available' : ''
            }${seat.isActive ? ' carriage-seat__seat_active' : ''}`}
            title={priceTooltip().toLocaleString('ru-RU')}
            onClick={
              seat.available || seat.isActive
                ? () => onSeatClick(seat.index, priceTooltip(), seat.isActive)
                : undefined
            }
          >
            {seat.index}
          </li>
        ))}
      </ul>

      <CarriageTotalPrice isForward={isForward} />
    </div>
  );
};

export default CarriageSeat;
