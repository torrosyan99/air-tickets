import {useState} from "react";
import {formatDate} from "@/shared/utils/formateDate/formateDate.js";
import {encodeBase64} from "@/shared/utils/base64/index.js";
import {useNavigate} from "react-router-dom";
import {PagePaths} from "@/shared/configs/routerConfig/routerConfig.jsx";

export const useRoutesSearch = (data) => {
  const [errors, setErrors] = useState({
    from: '',
    to: ''
  });

  const navigation = useNavigate();

  const error = (key) => {
    if (!data[key].name) {
      setErrors(e => ({
        ...e,
        [key]: 'Введите поле',
      }))

      return
    } else if (data[key].name && errors[key]) setErrors(e => ({
      ...e,
      [key]: ''
    }));

    if (!data[key].id) {
      setErrors(e => ({
        ...e,
        [key]: 'Некоректное местоположение',
      }))
    }
  };

  const onSubmit = (e) => {
    e.preventDefault()

    error('from')
    error('to')

    if (!data.to.name || !data.from.name) return

    let dataStr = `from_city_id=${data.from.id}&to_city_id=${data.to.id}`;
    if (data.startDate) {
      dataStr += `&date_start=${formatDate(data.startDate)}`;
    }
    if (data.endDate) {
      dataStr += `&date_end=${formatDate(data.endDate)}`;
    }


    navigation({
      pathname: PagePaths.TICKETS,
      search: `s=${encodeBase64(dataStr)}`
    })

  }

  return {onSubmit, errors, setErrors}
}