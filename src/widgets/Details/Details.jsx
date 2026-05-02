import './Details.css'
import {ToggleContent} from "@/shared/ui/ToggleContent/ToggleContent.jsx";
import ArrowRight from '@icons/arrow-orange-right.svg?react'
import ArrowLeft from '@icons/arrow-orange-left.svg?react'
import ArrowGraphicRight from "@icons/ticket-arrow-right.svg?react"
import ArrowGraphicLeft from "@icons/ticket-arrow-left.svg?react"
import PassengersSvg from "@icons/passengers.svg?react"
import RubSvg from "@icons/rub.svg?react"
import WhiteRubSvg from "@icons/white-rub.svg?react"
import {useSelector} from "react-redux";
import {
  activeSeatsSelector,
  priceForSeatsSelector,
  priceSelector,
  ticketSelector
} from "@/entities/train/model/selectors.jsx";
import {formateHours} from "@/shared/utils/formateHours/formateHours.js";

export const Details = () => {

  const {departure ,arrival} = useSelector(ticketSelector) || {}

  const departureSeats = useSelector(activeSeatsSelector) || [];
  const arrivalSeats = useSelector((state) =>
    activeSeatsSelector(state, 'arrival')
  ) || [];

  const arrivalPrice = useSelector(state => priceSelector(state, 'arrival')) || 0;
  const departurePrice = useSelector(priceSelector) || 0;

  const arrivalForSeatsPrice = useSelector(state => priceForSeatsSelector(state, 'arrival')) || 0;
  const departureForSeatsPrice = useSelector(priceForSeatsSelector) || 0;

  // ✅ объединяем
  const allSeats = [...departureSeats, ...arrivalSeats];

  // ✅ считаем
  const { adults, children } = allSeats.reduce((acc, curr) => {
    if (curr.person_info?.is_adult) acc.adults++;
    if (curr.person_info?.is_child || curr.is_child) acc.children++;
    return acc;
  }, { adults: 0, children: 0 });

  const totalPeople = adults + children;
  const totalSeatsPrice = arrivalForSeatsPrice + departureForSeatsPrice;

  const priceForOne = totalPeople ? totalSeatsPrice / totalPeople : 0;

  return (
    <div className="details">
      <h2 className={'details__main-title'}>
        Детали поездки
      </h2>

      <div className={'details__block'}>
        <ToggleContent icon={ArrowRight} title={<h3 className={'details__title'}>Туда</h3>}>
          <div className={'details__info'}>
            <div className={'details__info-item'}>
              <span className={'details__info-key'}> № Поезда</span>
              <span className={'details__info-train'}>{departure?.train?.name}</span>
            </div>
            <div className="details__info-item">
              <span className={'details__info-key'}>Название</span>
              <span className={'details__info-name'}>
                {departure?.from?.railway_station_name}
              </span>
            </div>
            <div className={'details__graphic'}>
              <p className={'details__graphic-item'}>
                {formateHours(departure?.from?.datetime)}
              </p>

              <div className={'details__duration'}>
                <ArrowGraphicRight/>
                <span className={'details__duration-time'}>
                  {formateHours(departure?.duration)}
                </span>
              </div>

              <p className={'details__graphic-item'}>
                {formateHours(departure?.to?.datetime)}
              </p>
            </div>

            <div className={'details__info-item'}>
              <p className={'details__info-place'}>
                {departure?.from?.city?.name}
                <span>
                  {departure?.from?.railway_station_name}<br/> вокзал
                </span>
              </p>
              <p className={'details__info-place'}>
                {departure?.to?.city?.name}
                <span>
                  {departure?.to?.railway_station_name}<br/> вокзал
                </span>
              </p>
            </div>
          </div>
        </ToggleContent>
      </div>

      {arrival && (
        <div className='details__block'>
          <ToggleContent icon={ArrowLeft} title={<h3 className={'details__title'}>Обратно</h3>}>
            <div className={'details__info'}>
              <div className={'details__info-item'}>
                <span className={'details__info-key'}> № Поезда</span>
                <span className={'details__info-train'}>{arrival?.train?.name}</span>
              </div>

              <div className="details__info-item">
                <span className={'details__info-key'}>Название</span>
                <span className={'details__info-name'}>
                  {arrival?.from?.railway_station_name}
                </span>
              </div>

              <div className={'details__graphic'}>
                <p className={'details__graphic-item'}>
                  {formateHours(arrival?.from?.datetime)}
                </p>

                <div className={'details__duration'}>
                  <ArrowGraphicLeft/>
                  <span className={'details__duration-time'}>
                    {formateHours(arrival?.duration)}
                  </span>
                </div>

                <p className={'details__graphic-item'}>
                  {formateHours(arrival?.to?.datetime)}
                </p>
              </div>

              <div className={'details__info-item'}>
                <p className={'details__info-place'}>
                  {arrival?.from?.city?.name}
                  <span>
                    {arrival?.from?.railway_station_name}<br/> вокзал
                  </span>
                </p>
                <p className={'details__info-place'}>
                  {arrival?.to?.city?.name}
                  <span>
                    {arrival?.to?.railway_station_name}<br/> вокзал
                  </span>
                </p>
              </div>
            </div>
          </ToggleContent>
        </div>
      )}

      <div className='details__block details__passengers'>
        <ToggleContent icon={PassengersSvg} title={<h3 className={'details__title'}>Пассажиры</h3>}>
          <div className={'details__info'}>
            {adults > 0 && <div className={'details__info-item'}>
              <span className={'details__info-key'}>
                {adults} Взрослых
              </span>
              <div className={'details__info-price'}>
                {Math.round(adults * priceForOne)}
                <RubSvg width={14} height={17}/>
              </div>
            </div>}

            {children > 0 && (
              <div className={'details__info-item'}>
                <span className={'details__info-key'}>
                  {children} Ребенок
                </span>
                <div className={'details__info-price'}>
                  {Math.round(children * priceForOne)}
                  <RubSvg width={14} height={17}/>
                </div>
              </div>
            )}
          </div>
        </ToggleContent>
      </div>

      <div className={'details__bottom'}>
        <span>Итог</span>
        <div className={'details__all-price'}>
          {arrivalPrice + departurePrice}
          <WhiteRubSvg />
        </div>
      </div>
    </div>
  );
};