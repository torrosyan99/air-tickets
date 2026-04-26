// import CarriageNumber from '../../../../../Training/FE_diploma/src/components/CarriageNumber/CarriageNumber';
// import CarriageTotalPrice from '../../../../../Training/FE_diploma/src/components/CarriageTotalPrice/CarriageTotalPrice';
// import PotentialPassengers from '../../../../../Training/FE_diploma/src/components/PotentialPassengers/PotentialPassengers';

import carriagePlatzkart from './carriage-platzkart.svg';
import './carriagePlatzkart.css';

const CarriagePlatzkart = () => {
  const data = {
    baby: 1,
    currentSeats:  [
      {
        "index": 1,
        "available": false
      },
      {
        "index": 2,
        "available": true
      },
      {
        "index": 3,
        "available": false
      },
      {
        "index": 4,
        "available": false
      },
      {
        "index": 5,
        "available": false
      },
      {
        "index": 6,
        "available": false
      },
      {
        "index": 7,
        "available": true
      },
      {
        "index": 8,
        "available": true
      },
      {
        "index": 9,
        "available": true
      },
      {
        "index": 10,
        "available": false
      },
      {
        "index": 11,
        "available": false
      }
    ],
    top_price: 2830,
    bottom: 4204,
    side_price: 0,
    have_wifi: true,
    wifiPrice: 100,
    is_linens_included:true,
    linensPrice: 250,
    onSeatClick: () => console.log('onSeatClick'),
  }
  const {
    isForward,
    baby,
    currentSeats,
    carriage_number,
    top_price,
    bottom_price,
    side_price,
    have_wifi,
    wiFiPrice,
    is_linens_included,
    linensPrice,
    onSeatClick,
  } = data;

  const priceTooltip = (num) => {
    let price = 0;

    if (num > 32) {
      price = side_price;
    } else {
      price = num % 2 ? bottom_price : top_price;
    }

    const wifi = have_wifi ? wiFiPrice : 0;
    const linens = !is_linens_included ? linensPrice : 0;
    const priceWithFeatures = price + wifi + linens;

    return baby.isActive ? 0 : priceWithFeatures; // младенцы едут бесплатно !!!
  };

  return (
    <div className="carriage-platzkart">
      {/*<PotentialPassengers />*/}

      <img
        className="carriage-platzkart__img"
        src={carriagePlatzkart}
        alt="platzkart"
      />

      {/*<CarriageNumber carriageNumber={carriage_number} />*/}

      <ul className="carriage-platzkart__scheme">
        {currentSeats.map((seat) => (
          <li
            key={seat.index}
            className={`carriage-platzkart__seat carriage-platzkart__seat_${
              seat.index
            }${seat.available ? ' carriage-platzkart__seat_available' : ''}${
              seat.isActive ? ' carriage-platzkart__seat_active' : ''
            }`}
            title={priceTooltip(seat.index).toLocaleString('ru-RU')}
            onClick={
              seat.available || seat.isActive
                ? () =>
                    onSeatClick(
                      seat.index,
                      priceTooltip(seat.index),
                      seat.isActive
                    )
                : undefined
            }
          >
            {seat.index}
          </li>
        ))}
      </ul>

      {/*<CarriageTotalPrice isForward={isForward} />*/}
    </div>
  );
};

export default CarriagePlatzkart;
