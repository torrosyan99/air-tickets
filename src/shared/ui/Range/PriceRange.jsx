import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {useState} from "react";

import './Range.css'

const Handle = ({props}) => {
  const { value, dragging, index, ...restProps } = props;
  const min = restProps['aria-valuemin'];
  const max = restProps['aria-valuemax'];
  const now = restProps['aria-valuenow'];
  console.log({min, max, now});
  return (
    <div {...restProps}>
      <div className="range__prices-hangle">
        {now !== min && now !== max &&
          <div className="range__prices-value">{now}</div>}
      </div>
    </div>
  );
};

export const PriceRange = ({min, max}) => {
  const [value, setValue] = useState([min, max]);


  return (
    <div className="range">
      <div className="range__from-to">
        <span>от</span>
        <span>до</span>
      </div>
      <Slider
        handleRender={Handle}
        className="range__slider"
        range
        min={min}
        max={max}

        value={value}
        onChange={(vals) => {
          const [a, b] = vals;

          setValue(a < b ? vals : [a, b]);
        }}
      />

      <div className="range__prices">
        <span>{min}</span>
        <span>{max}</span>
      </div>

    </div>
  );
};