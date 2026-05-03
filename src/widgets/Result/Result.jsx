import {useSelector} from "react-redux";
import {
  activeSeatsSelector,
  personalDataSelector,
  priceSelector, routeIdSelector,
  ticketSelector
} from "@/entities/train/model/selectors.jsx";
import './Result.css'
import {TicketsItem} from "@/widgets/Tickets/TicketsItem.jsx";
import {Button} from "@/shared/ui/Button/Button.jsx";
import PersonSvg from "@icons/person.svg?react"

import RubSvg from "@icons/rub.svg?react"
import {PagePaths} from "@/shared/configs/routerConfig/routerConfig.jsx";
import {useNavigate} from "react-router-dom";

export const Result = () => {
  const ticket = useSelector(ticketSelector);
  const personaldata = useSelector(personalDataSelector);
  const navigate = useNavigate()
  const price = useSelector(priceSelector);
  const arrivalPrice = useSelector((state) => priceSelector(state, 'arrival')) || 0;
  const departureActiveSeats = useSelector(activeSeatsSelector);
  const arrivalActiveSeats = useSelector((state) => activeSeatsSelector(state, 'arrival')) || [];

  const data = [...departureActiveSeats, ...arrivalActiveSeats]

  const handleClick = () => {
    fetch( 'https://students.netoservices.ru/fe-diplom/order', {
      method: 'POST',
      body: JSON.stringify({
        "user": personaldata,
        "departure": {
          "route_direction_id": ticket.departure._id,
          "seats": departureActiveSeats
        },
       'arrival':  arrivalActiveSeats.length > 0 && {
         "route_direction_id": ticket.arrival._id,
         "seats": arrivalActiveSeats

       }
      })
    })
      .then( response => response.json())
      .then(data => {
        if (data.status)navigate(PagePaths.SUCCESS)
      });
  }

  return (
    <section className="result">
      <div className={'result__block'}>
        <div className={'result__block-top'}>
          <h3 className={'result__title'}>Поезд</h3>
        </div>
        <TicketsItem departure={ticket.departure} arrival={ticket.arrival}>
          <Button  variant={'black-ghost'} size={'sm'}>Изменить</Button>
        </TicketsItem>
      </div>
      <div className={'result__block'}>
        <div className={'result__block-top'}>
          <h3 className={'result__title'}>Пасажиры</h3>
        </div>
        <div className={'result__passengers'}>
          <ul className={'result__list'}>
            {data.map((item) => (<li className={'result__item'}>
              <div className={'result__item-person'}>
                <PersonSvg/>
                <span>{item.is_child ? 'Детский' : 'Взрослый'}</span>
              </div>
              <div className={'result__item-info'}>
                <p className={'result__item-name'}>
                  {item.person_info.first_name} {' '}
                  {item.person_info.last_name} {' '}
                  {item.person_info.patronymic}
                </p>
                <p className={'result__info-value'}>
                  Пол {item.person_info.gender ? 'Мужской' : 'Женский'}
                </p>
                <p className={'result__info-value'}>
                  Дата рождения {item.person_info.birthday}
                </p>
                <p className={'result__info-value'}>
                  {item.person_info.document_type}
                  {item.person_info.document_type === 'паспорт' && ' РФ '}
                  {item.person_info.document_data}
                </p>
              </div>
            </li>))}
          </ul>
          <div className={'result__right'}>
            <div className={'result__right-flex'}>
              <span>Всего</span>
              <div className={'result__price'}>

                {price + arrivalPrice}
                <RubSvg width={20} height={24}/>
              </div>

            </div>
            <Button variant={'black-ghost'} size={'sm'}>Изменить</Button>

          </div>
        </div>
      </div>
      <div className={'result__block'}>
        <div className={'result__block-top'}>
          <h3 className={'result__title'}>Способ оплаты</h3>
        </div>
        <div className={'result__payment'}>
          <div className={'result__payment-type'}>
            {personaldata.payment_method === 'online' ? 'Онлайн' : 'Наличные'}
          </div>
          <div className={'result__right'}>
            <Button
                    variant={'black-ghost'} size={'sm'}>Изменить</Button>
          </div>
        </div>
      </div>

      <Button className={'result__button'} color={'white'} onClick={handleClick}>
        ПОДТВЕРДИТЬ
      </Button>

    </section>
  );
};
