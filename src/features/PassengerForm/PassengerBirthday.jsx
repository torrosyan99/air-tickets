import {Input} from "@/shared/ui/Input/Input.jsx";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";
import {useDispatch} from "react-redux";

const formatDateMask = (value) => {
  // убираем всё кроме цифр
  const digits = value.replace(/\D/g, "");

  // вставляем точки
  const parts = [];

  if (digits.length > 0) parts.push(digits.slice(0, 2));      // DD
  if (digits.length > 2) parts.push(digits.slice(2, 4));      // MM
  if (digits.length > 4) parts.push(digits.slice(4, 8));      // YYYY

  return parts.join(".");
};

export const PassengerBirthday = ({ seat }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const formatted = formatDateMask(e.target.value);

    dispatch(ticketActions.changePersonInfo({
      value: formatted,
      direction: seat.direction,
      seat_number: seat.seat_number,
      name: "birthday",
    }));
  };

  return (
    <div className={'passenger-form__item'}>
      <label className={'passenger-form__label'}>
        Дата рождения
      </label>
    <Input
      className={'passenger-form__birthday'}
      variant="small"
      placeholder="ДД.ММ.ГГГГ"
      value={seat.person_info.birthday || ""}
      onChange={handleChange}
    />
    </div>
  );
};