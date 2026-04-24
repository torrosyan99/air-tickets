import {API} from "@/shared/api/index.js";
import {useState} from "react";
import {formatDate} from "@/shared/utils/formateDate/formateDate.js";

export const useRoutesSearch = (data) => {
  const [errors, setErrors] = useState({
    from: '',
    to: ''
  });

  const emptyError = (key) => {
    if (!data[key].name) {
      setErrors(e => ({
        ...e,
        [key]: 'Введите поле',
      }))

      return
    }
    else if (data[key].name && errors[key]) setErrors(e => ({
      ...e,
      [key]: ''
    }));

    if(data[key].id === 'none') {
      setErrors(e => ({
        ...e,
        [key]: 'Некоректное местоположение',
      }))
    }
  };

  const onSubmit = (e) => {
    e.preventDefault()

    emptyError('from')
    emptyError('to')

    if (!data.to.name || !data.from.name) return

    let api = API.ROUTES + `?from_city_id=${data.from.id}&to_city_id=${data.to.id}`;
    if(data.startDate) {
      api += `&date_start=${formatDate(data.startDate)}`;
    }
    if(data.endDate) {
      api += `&date_end=${formatDate(data.endDate)}`;
    }
    console.log(api)
    fetch(api).then(res => res.json()).then((data) => {
      console.log(data)
    })

  }

  return {onSubmit, errors, setErrors}
}