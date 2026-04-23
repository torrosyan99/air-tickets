import {cn} from "@/shared/utils/cn/cn.js";
import './Input.css'
import {forwardRef} from "react";

export const Input = forwardRef(({className, inputClass, ...others}, ref) => {
  return (
    <div className={cn('input', [className])}>
      <input
        ref={ref}
        className={cn("input__main", [inputClass])}
        {...others} />
    </div>
  );
});
