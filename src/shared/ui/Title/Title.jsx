import './Title.css'
import {cn} from "@/shared/utils/cn/cn.js";

export const Title = ({children, className}) => {
  return (
    <h3 className={cn('title', [className])}>
      {children}
    </h3>
  );
};
