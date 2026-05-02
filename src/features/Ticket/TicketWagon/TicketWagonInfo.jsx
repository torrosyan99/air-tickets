import RubSvg from '@icons/rub.svg?react'
import {TicketServices} from "./TicketServices.jsx";

export const TicketWagonInfo = ({wagon, arrival}) => {

  return (

    <div className={'ticket__wagon-info'}>
      <div className={'ticket__wagon-name'}>
        {wagon.coach.name}
        <span>вагон</span>
      </div>
      <div className={'ticket__wagon-item'}>
        <p className={'ticket__wagon-item-name'}>
          Места <span>{wagon.coach.available_seats}</span>
        </p>

        {wagon.coach?.top_price > 0 && <p className={'ticket__wagon-place'}>Верхние</p>
        }
        {wagon.coach?.bottom_price > 0 && <p className={'ticket__wagon-place'}>Нижние</p>
        }
        {wagon.coach?.side_price > 0 && <p className={'ticket__wagon-place'}>Боковы</p>
        }

      </div>
      <div className={'ticket__wagon-item'}>
        <p className={'ticket__wagon-item-name'}>
          Стоимость
        </p>

        {wagon.coach?.top_price > 0 &&
          <p className={'ticket__wagon-price'}>{wagon.coach?.top_price.toLocaleString('ru-RU')}
            <RubSvg width={14} height={17}/>
          </p>
        }
        {wagon.coach?.bottom_price > 0 &&
          <p className={'ticket__wagon-price'}>{wagon.coach?.bottom_price.toLocaleString('ru-RU')}
            <RubSvg width={14} height={17}/>
          </p>
        }
        {wagon.coach?.side_price > 0 &&
          <p className={'ticket__wagon-price'}>{wagon.coach?.side_price.toLocaleString('ru-RU')}
            <RubSvg width={14} height={17}/>
          </p>
        }


      </div>
      <div className={'ticket__wagon-item'}>
        <p className={'ticket__wagon-item-name'}>
          Обслуживание
          <span className={'ticket__fpk'}>ФПК</span>
        </p>
        <TicketServices wagon={wagon} arrival={arrival}/>
      </div>
    </div>
  );
};
