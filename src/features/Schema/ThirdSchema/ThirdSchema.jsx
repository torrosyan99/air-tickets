import { useEffect, useRef, useState, useMemo } from "react";
import thirdSchema from "@/shared/assets/images/third-schema.svg";
import "./ThirdSchema.css";
import { SchemaName } from "../SchemaName.jsx";

export const ThirdSchema = ({
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
    side_price,
    have_wifi,
    wifi_price,
    is_linens_included,
    linens_price,
  } = coach;

  const priceTooltip = useMemo(() => {
    const basePrices = [top_price, bottom_price, side_price].filter(
      (p) => typeof p === "number"
    );

    const base = basePrices.length ? Math.min(...basePrices) : 0;

    return (
      base +
      (have_wifi ? wifi_price : 0) +
      (is_linens_included ? 0 : linens_price)
    );
  }, [
    top_price,
    bottom_price,
    side_price,
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

    // если уже выбран → удаляем
    if (seat.isActive) {
      onSeatClick(seat.index, priceTooltip, "adult", true);
      return;
    }

    // direct режим → сразу добавляем
    if (selectionMode === "direct") {
      onSeatClick(seat.index, priceTooltip, "adult", false);
      return;
    }

    // dropdown режим
    setActiveSeat((prev) => (prev === seat.index ? null : seat.index));
  };

  // выбор пассажира
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
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown, true);
  }, []);

  // защита от внешнего изменения активного места
  useEffect(() => {
    if (activeSeatData?.isActive) {
      setActiveSeat(null);
    }
  }, [activeSeatData]);

  return (
    <div className="third-schema" ref={containerRef}>
      <img
        className="third-schema__img"
        src={thirdSchema}
        alt="platzkart"
      />

      <SchemaName name={coach.name} />

      <ul className="third-schema__schema">
        {currentSeats.map((seat) => (
          <li
            key={seat.index}
            className={`third-schema__seat third-schema__seat_${seat.index}
              ${seat.available ? " third-schema__seat_available" : ""}
              ${seat.isActive ? " third-schema__seat_active" : ""}`}
            onClick={(e) => handleSeatClick(seat, e)}
          >
            {seat.index}

            {selectionMode === "dropdown" &&
              activeSeatData?.index === seat.index &&
              activeSeatData?.available && (
                <div className="seat-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect("adult");
                    }}
                  >
                    Взрослый
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect("child");
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