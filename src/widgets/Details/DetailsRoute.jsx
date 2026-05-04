import { Title } from '@/shared/ui/Title/Title.jsx';
import { ToggleContent } from '@/shared/ui/ToggleContent/ToggleContent.jsx';
import { formateHours } from '@/shared/utils/formateHours/formateHours.js';

export const DetailsRoute = ({
                               route,
                               title,
                               icon,
                               ArrowIcon
                             }) => {
  if (!route) return null;

  return (
    <div className='details__block'>
      <ToggleContent icon={icon} title={<Title variant={'bold'} className='details__title'>{title}</Title>}>
        <div className='details__info'>
          <div className='details__info-item'>
            <span className='details__info-key'>№ Поезда</span>
            <Title h={4}  variant={'bold'} className='details__info-train'>{route?.train?.name}</Title>
          </div>

          <div className="details__info-item">
            <span className='details__info-key'>Название</span>
            <span className='details__info-name'>
              {route?.from?.railway_station_name}
            </span>
          </div>

          <div className='details__graphic'>
            <Title h={4} variant={'bold'} className={'details__graphic-item'}>{formateHours(route?.from?.datetime)}</Title>

            <div className='details__duration'>
              <ArrowIcon />
              <span className={'details__duration-time'}>
                {formateHours(route?.duration)}
              </span>
            </div>

            <Title h={4} variant={'bold'} className={'details__graphic-item'}>{formateHours(route?.to?.datetime)}</Title>
          </div>

          <div className='details__info-item'>
            <p className={'details__info-place'}>
              {route?.from?.city?.name}
              <span>{route?.from?.railway_station_name}</span>
            </p>
            <p className={'details__info-place'}>
              {route?.to?.city?.name}
              <span>{route?.to?.railway_station_name}</span>
            </p>
          </div>
        </div>
      </ToggleContent>
    </div>
  );
};