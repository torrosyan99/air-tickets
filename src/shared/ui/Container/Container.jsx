import {cn} from "@/shared/utils/cn/cn.js";

import './Container.css'

export const Container = ({className, children}) => {
  return (
    <div className={cn('container', [className] )}>
      {children}
    </div>
  );
};
