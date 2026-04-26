import {FilterDate} from "./FilterDate.jsx";
import {FilterAdditional} from "./FilterAdditional/FilterAdditional.jsx";
import ArrowOrangeRight from "@icons/arrow-orange-right.svg?react"
import ArrowOrangeLeft from "@icons/arrow-orange-left.svg?react"
import './Filter.css'
import {FilterPrice} from "./FilterPrice.jsx";
import {ToggleContent} from "@/shared/ui/ToggleContent/ToggleContent.jsx";

export const Filter = () => {
  return (
    <div className="filter">
       <FilterDate />
        <FilterAdditional />
      <FilterPrice />
      <div className={'filter__block'}>
      <ToggleContent icon={ArrowOrangeRight}  title={<h3 className={'filter__title'}>
        Туда
      </h3>}>
      <div>right</div>
      </ToggleContent>
      </div>
      <div className={'filter__block'}>
        <ToggleContent icon={ArrowOrangeLeft}  title={<h3 className={'filter__title'}>
          Оттуда
        </h3>}>
          <div>left</div>
        </ToggleContent>

      </div>

    </div>
  );
};
