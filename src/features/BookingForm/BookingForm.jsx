import './BookingForm.css'
import { useState } from 'react';

import { BookingDate } from '@/features/BookingForm/BookingDate.jsx';
import { BookingRoutes } from '@/features/BookingForm/BookingRoutes.jsx';
import { Button } from '@/shared/ui/Button/Button.jsx';
import {useRoutesSearch} from "@/shared/hooks/useRoutesSearch/useRoutesSearch.jsx";
import {cn} from "@/shared/utils/cn/cn.js";

export const BookingForm = ({horizontal}) => {
  const [data, setData] = useState({
    from: { name: '', id: null},
    to: { name: '', id: null },
    startDate: null,
    endDate: null,
  });

  const {onSubmit, errors, setErrors} = useRoutesSearch(data)


  return (
    <div className={cn("booking", [], {
      'booking--horizontal': horizontal
    })}>
      <form className={'booking__form'} onSubmit={onSubmit}>
        <BookingRoutes data={data} setData={setData} errors={errors} setErrors={setErrors} />
         <BookingDate data={data} setData={setData}/>
        <Button className={'booking__button'} type={'submit'}>
          НАЙТЫ БИЛЕТЫ
        </Button>
      </form>
    </div>
  );
};
