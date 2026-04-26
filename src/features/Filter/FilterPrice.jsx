import {PriceRange} from "@/shared/ui/Range/PriceRange.jsx";

export const FilterPrice = () => {
  return (
    <div className="filter__block filter__price">
      <h3 className={'filter__title'}>Стоимость</h3>
      <PriceRange min={0} max={2000} />
    </div>
  );
};
