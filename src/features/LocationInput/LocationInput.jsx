import {Input} from '@/shared/ui/Input/Input.jsx';

import './LocationInput.css'
import {useEffect, useState} from "react";

function capitalizeFirstLetter(str) {
  if (!str) return str; // защита от пустой строки
  return str[0].toUpperCase() + str.slice(1);
}
export const LocationInput = ({placeholder, value, setValue}) => {
  const [items, setItems] = useState([]);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if(value.length > 0){
      console.log('value',value)
      fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${value}`)
        .then(res => res.json())
        .then(setItems)
    }
  }, [value]);

  return (
    <div className="location-input">
      <Input
        className="location-input__main"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue({
          name: e.target.value,
          id: ''
        })}
        placeholder={placeholder}  />
      {items.length > 0  && focused &&
        <ul className={'location-input__list'}>
        {items.map(item => (<li className={'location-input__item'} key={item._id}>
          <button className={'location-input__list-button'} type={'button'}
          onMouseDown={() => setValue({
            name:item.name,
            id:item._id
          })}
          >{item.name}</button>
        </li>))}
      </ul>}

    </div>
  );
};
