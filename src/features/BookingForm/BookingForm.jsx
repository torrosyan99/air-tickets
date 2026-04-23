import './BookingForm.css'
import {LocationInput} from "@/features/LocationInput/LocationInput.jsx";
import {Button} from "@/shared/ui/Button/Button.jsx";
import {useState} from "react";
import ChangeSvg from '@icons/change.svg?react'
import {Calendar} from "@/shared/ui/Calendar/Calendar.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {PagePaths} from "@/shared/configs/routerConfig/routerConfig.jsx";

export const BookingForm = () => {
  const [data, setData] = useState({
    from : {name:'', id:'sadasds'},
    to: {name: '', id: 'adasdsadsadas'},
    startDate: null,
    endDate: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  return (
    <div className="booking">
      <form className={'booking__form'} onSubmit={(e) => {
        e.preventDefault();

        const params = btoa(JSON.stringify({
          from: data.from.id,
          to: data.to.id,
        }))
        console.log(searchParams);
        navigate(`${PagePaths.TICKETS}?q=${params}`);
        // fetch(
        //   `https://students.netoservices.ru/fe-diplom/routes?from_city_id=${data.from.id}&to_city_id=${data.to.id}`)
        //   .then(res => {
        //     return res.json()
        //   })
        //   .then(console.log)
      }}>
      <div className={'booking__routes'}>
        <h3 className={'booking__title'}>Направление</h3>
        <div className={'booking__wrapper'}>
          <LocationInput placeholder={'Откуда'} value={data.from.name } setValue={(str) => setData({
            ...data,
            from: str
          })} />
          <button className={'booking__change-button'} onClick={() => setData({
            ...data,
            to: data.from,
            from: data.to,
          })}  type={'button'}>
            <ChangeSvg />
          </button>
          <LocationInput placeholder={'Куда'} value={data.to.name} setValue={(str) => setData({
            ...data,
            to: str
          })}  />
        </div>
      </div>
      <div className={'booking__data'}>
        <h3 className={'booking__title'}>Дата</h3>
        <div className={'booking__wrapper'}>
          <Calendar date={data.startDate} setDate={(date) => setData({
            ...data,
            startDate: date,
          })} />
          <Calendar date={data.endDate} minDate={data.startDate} setDate={(date) => setData( prev =>({
            ...prev,
            endDate: date,
          }))} />
        </div>
      </div>
        <Button className={'booking__button'} type={'submit'}>
          НАЙТЫ БИЛЕТЫ
        </Button>
      </form>
    </div>
  );
};
