import {cn} from "@/shared/utils/cn/cn.js";
import StepSvg from "@icons/step-icon.svg?react"
export const Step = ({active, last, children}) => {
  return (
    <div className={cn('steps__item', [], {
      'steps__item--active': active,
    })}>
      {children}
      {!last && <StepSvg className="steps__icon"/>}
    </div>
  );
};
