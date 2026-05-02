import { TicketCountsInput } from "./TicketCountsInput.jsx";

export const TicketCounts = ({ passengers = {}, setPassengers }) => {

  const handleChange = (e, name, max) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setPassengers(v => ({
        ...v,
        [name]: 0
      }));
      return;
    }

    const num = Number(value);

    if (num > max) return;

    setPassengers(v => ({
      ...v,
      [name]: num
    }));
  };

  return (
    <>
      <h3 className="ticket__item-title">
        Количество билетов
      </h3>

      <div className="ticket__counts">

        <TicketCountsInput
          value={`Взрослых — ${passengers.old ?? 0}`}
          onChange={(e) => handleChange(e, 'old', 5)}
        >
          {passengers.old !== 5 && (
            <p className="ticket__counts-text">
              Можно добавить {passengers.old > 0 && "еще "}
              {5 - (passengers.old ?? 0) || 5} пассажиров
            </p>
          )}
        </TicketCountsInput>

        <TicketCountsInput
          value={`Детских — ${passengers.children ?? 0}`}
          onChange={(e) => handleChange(e, 'children', 3)}
        >
          {passengers.children !== 3 && (
            <p className="ticket__counts-text">
              Можно добавить {passengers.children > 0 && "еще "}
              {3 - (passengers.children ?? 0) || 3} детей до 10 лет.
              Свое место в вагоне, как у взрослых, но дешевле на 50–65%
            </p>
          )}
        </TicketCountsInput>

        <TicketCountsInput
          value={`Детских «без места» — ${passengers.children_without_place ?? 0}`}
          onChange={(e) =>
            handleChange(
              e,
              'children_without_place',
              passengers.old ?? 0
            )
          }
        />

      </div>
    </>
  );
};