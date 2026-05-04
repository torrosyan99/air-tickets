import { useSelector, shallowEqual } from "react-redux";
import {
  activeSeatsSelector,
  priceSelector,
  ticketSelector
} from "@/entities/ticket/model/selectors.jsx";
import { useMemo } from "react";

export const useTripDetails = () => {
  const { departure, arrival } = useSelector(ticketSelector) || {};

  const departurePrice = useSelector(priceSelector) || 0;
  const arrivalPrice = useSelector(
    (state) => priceSelector(state, "arrival")
  ) || 0;

  const activeDepartureSeats = useSelector(activeSeatsSelector, shallowEqual) || [];
  const activeArrivalSeats = useSelector(
    (state) => activeSeatsSelector(state, "arrival"),
    shallowEqual
  ) || [];

  const priceInfo = useMemo(() => {
    return [...activeDepartureSeats, ...activeArrivalSeats].reduce(
      (acc, { is_child, price = 0 }) => {
        const key = is_child ? "children" : "adults";

        acc[key].count += 1;
        acc[key].price += price;

        return acc;
      },
      {
        adults: { price: 0, count: 0 },
        children: { price: 0, count: 0 }
      }
    );
  }, [activeDepartureSeats, activeArrivalSeats]);

  const totalPrice = useMemo(
    () => departurePrice + arrivalPrice,
    [departurePrice, arrivalPrice]
  );

  return {
    departure,
    arrival,
    totalPrice,
    priceInfo
  };
};