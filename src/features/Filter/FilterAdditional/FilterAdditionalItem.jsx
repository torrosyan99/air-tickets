import {Switcher} from "@/shared/ui/Switcher/Switcher.jsx";
import {useState} from "react";

export const FilterAdditionalItem = ({icon: Icon, children}) => {
  const [isActive, setActive] = useState(false);
  return (
    <div className={'filter__additional-item'}>
      <div className={'filter__icon-wrapper'}>
        {<Icon/>}
      </div>
      <span>{children}</span>
      <Switcher className="filter__switcher" isActive={isActive} onClick={() => setActive(!isActive)}/>
    </div>
  );
};
