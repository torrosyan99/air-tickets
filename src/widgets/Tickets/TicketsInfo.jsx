import ArrowRightSvg from '@icons/arrow-right.svg?react';
import TrainSvg from '@icons/train.svg?react';

export const TicketsInfo = ({ departure }) => {
  return (<div className={'tickets__info'}>
      <TrainSvg />
      <h3 className={'tickets__name'}>
        {departure.train.name}
      </h3>
      <div className={'tickets__direction'}>
        <span>{departure.from.city.name}</span> <ArrowRightSvg /> <br />
        <span>{departure.to.city.name}</span>
      </div>
    </div>
  );
};
