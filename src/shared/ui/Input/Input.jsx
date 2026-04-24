import { cn } from '@/shared/utils/cn/cn.js';
import { forwardRef } from 'react';

import './Input.css'

export const Input = forwardRef(({ className, inputClass, children, error='', ...others }, ref) => {
  return (
    <div className={cn('input-wrapper', [className])}>
      {error.length > 0 && <p className={'input__error'}>{error}</p> }
      <input
        ref={ref}
        className={cn('input', [inputClass])}
        {...others} />
      {children}
    </div>
  );
});
