import './TrainServices.css'

import UnderwearSvg from '@icons/underwear.svg?react'
import ConditionerSvg from '@icons/conditioner.svg?react'
import CoffeeSvg from '@icons/coffee.svg'
import WiFiSvg from '@icons/wi-fi-2.svg?react'
import ExpressSvg from '@icons/express.svg?react'

export const TrainServices = ({have_wifi, is_express, have_air_conditioning}) => {
  return (
    <div className={'train-services'}>
      {have_wifi && <WiFiSvg />}
      {is_express && <ExpressSvg />}
      {have_air_conditioning && <ConditionerSvg />}
    </div>
  );
};
