import {FilterAdditionalItem} from "./FilterAdditionalItem.jsx";
import CoupeSvg from "@icons/coupe.svg?react"
import PlackartSvg from "@icons/plackart.svg?react"
import SeatingSvg from "@icons/seating.svg?react"
import LuxurySvg from "@icons/luxury.svg?react"
import WiFiSvg from "@icons/wi-fi.svg?react"
import ExpressSvg from "@icons/express.svg?react"

export const FilterAdditional = () => {
  return (
    <div className="filter__block filter__additional">

      <FilterAdditionalItem icon={CoupeSvg}>
        Купе
      </FilterAdditionalItem>
      <FilterAdditionalItem icon={PlackartSvg}>
        Плацкарт
      </FilterAdditionalItem>
      <FilterAdditionalItem icon={SeatingSvg}>
        Сидячий
      </FilterAdditionalItem>
      <FilterAdditionalItem icon={LuxurySvg}>
        Люкс
      </FilterAdditionalItem>
      <FilterAdditionalItem icon={WiFiSvg}>
        Wi-Fi
      </FilterAdditionalItem>
      <FilterAdditionalItem icon={ExpressSvg}>
        Wi-Fi
      </FilterAdditionalItem>
    </div>
  );
};
