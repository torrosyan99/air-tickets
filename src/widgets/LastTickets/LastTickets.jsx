import {useEffect, useState} from "react";
import './LastTickets.css'
import {API} from "@/shared/api/index.js";
import {LastTicketsItem} from "./LastTicketsItem.jsx";

export const LastTickets = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API.LAST_TICKETS).then(res => res.json())
      .then(setData)
  }, [])


  return data.length > 0 && (
    <div className="last-tickets">
      <h3 className={'last-tickets__title'}>
        последние билеты
      </h3>
      <ul className={'last-tickets__list'}>
        {data.map((item) => (
        <LastTicketsItem  key={item.departure._id} {...item} />  ))}
      </ul>
    </div>
  );
};
