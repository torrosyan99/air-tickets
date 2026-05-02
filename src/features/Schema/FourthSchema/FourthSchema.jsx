import { useEffect, useRef, useState, useMemo } from "react";
import fourthSchema from '@/shared/assets/images/fourth-schema.svg';
import './ForuthSchema.css';
import { SchemaName } from "../SchemaName.jsx";

export const FourthSchema = ({
                               wagon,
                               onSeatClick,
                               selectionMode = "direct", // "dropdown" | "direct"
                             }) => {
  const [activeSeat, setActiveSeat] = useState(null);
  const containerRef = useRef(null);

  const { coach, seats: currentSeats } = wagon;

  const {
    top_price,
    bottom_price,
    have_wifi,
    wifi_price,
    is_linens_included,
    linens_price,
  } = coach;

  const priceTooltip = useMemo(() => {
    const prices = [top_price, bottom_price].filter(
      (p) => typeof p === "number"
    );

    const base = prices.length ? Math.min(...prices) : 0;

    return (
      base +
      (have_wifi ? wifi_price : 0) +
      (is_linens_included ? 0 : linens_price)
    );
  }, [
    top_price,
    bottom_price,
    have_wifi,
    wifi_price,
    is_linens_included,
    linens_price,
  ]);

  const activeSeatData = useMemo(() => {
    return currentSeats.find((s) => s.index === activeSeat);
  }, [currentSeats, activeSeat]);

  // 🚀 клик по месту
  const handleSeatClick = (seat, e) => {
    e.stopPropagation();

    if (!seat.available) return;

    // если уже активный → УДАЛЕНИЕ
    if (seat.isActive) {
      onSeatClick(seat.index, priceTooltip, "adult", true);
      return;
    }

    // direct режим → ДОБАВЛЕНИЕ
    if (selectionMode === "direct") {
      onSeatClick(seat.index, priceTooltip, "adult", false);
      return;
    }

    // dropdown режим
    setActiveSeat((prev) => (prev === seat.index ? null : seat.index));
  };

  // выбор типа пассажира → ДОБАВЛЕНИЕ
  const handleSelect = (type) => {
    if (!activeSeatData) return;

    onSeatClick(
      activeSeatData.index,
      priceTooltip,
      type,
      false
    );

    setActiveSeat(null);
  };

  // закрытие по клику вне
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target)) {
        setActiveSeat(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, []);

  // защита от внешних изменений seats
  useEffect(() => {
    if (activeSeatData?.isActive) {
      setActiveSeat(null);
    }
  }, [activeSeatData]);

  return (
    <div className="fourth-schema" ref={containerRef}>
      <img className="fourth-schema__img" src={fourthSchema} alt="seat" />

      <SchemaName name={coach.name} />

      <ul className="fourth-schema__scheme">
        {currentSeats.map((seat) => (
          <li
            key={seat.index}
            className={`fourth-schema__seat fourth-schema__seat_${seat.index}
              ${seat.available ? " fourth-schema__seat_available" : ""}
              ${seat.isActive ? " fourth-schema__seat_active" : ""}`}
            onClick={(e) => handleSeatClick(seat, e)}
          >
            {seat.index}

            {/* dropdown */}
            {selectionMode === "dropdown" &&
              activeSeatData?.index === seat.index &&
              activeSeatData?.available && (
                <div className="seat-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSeatClick(
                        activeSeatData.index,
                        priceTooltip,
                        "adult",
                        false
                      );
                      setActiveSeat(null);
                    }}
                  >
                    Взрослый
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSeatClick(
                        activeSeatData.index,
                        priceTooltip,
                        "child",
                        false
                      );
                      setActiveSeat(null);
                    }}
                  >
                    Ребёнок
                  </button>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};