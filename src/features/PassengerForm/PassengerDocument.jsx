import {cn} from "@/shared/utils/cn/cn.js";
import {SimpleSelect} from "@/shared/ui/SimpleSelect/SimpleSelect.jsx";
import {Input} from "@/shared/ui/Input/Input.jsx";
import {useDispatch} from "react-redux";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";

export const PassengerDocument = ({seat}) => {
  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    dispatch(ticketActions.changePersonInfo({
      value,
      direction: seat.direction,
      seat_number: seat.seat_number,
      name,
    }));
  };


  const updateDocumentData = (newSeries, newNumber) => {
    const value = `${newSeries} ${newNumber}`.trim();

    dispatch(ticketActions.changePersonInfo({
      value,
      direction: seat.direction,
      seat_number: seat.seat_number,
      name: "document_data",
    }));
  };

  const [series = '', number = ''] =
  seat.person_info.document_data?.split(' ') || [];
  return (
    <div className={
      'passenger-form__document'
    }>
      <div className={cn('passenger-form__item', [], {
        'passenger-form__select-full': seat.person_info.document_type !== 'паспорт'
      })}>
        <label className={'passenger-form__label'}>
          Тип документа
        </label>
        <SimpleSelect onChange={(value) => handleChange(value, 'document_type')}
                      options={['паспорт', 'свидетельство о рождении']}
                      value={seat.person_info.document_type}></SimpleSelect>
      </div>
      {seat.person_info.document_type === 'паспорт' ? <>


        <div className={'passenger-form__item'}>
          <label className={'passenger-form__label'}>
            Серия
          </label>
          <Input variant={'small'}
                 placeholder={'0 0 0 0'}
                 onChange={(e) => updateDocumentData(e.target.value, number)}
                 value={series}
                 max={4}
                 onlyNumber
          />
        </div>

        <div className={'passenger-form__item'}>
          <label className={'passenger-form__label'}>
            c
          </label>
          <Input variant={'small'}
                 placeholder={'0 0 0 0 0 0'}
                 value={number}
                 max={6}
                 onlyNumber
                 onChange={(e) => updateDocumentData(series, e.target.value)}
          />

        </div>

      </> : <div className={'passenger-form__item passenger-form__number'}>
        <label className={'passenger-form__label'}>
          Номер
        </label>
        <Input
          placeholder={'_ _ _ _ _ _ _ _ _ _ _ _'}

               onChange={(e) => handleChange(e.target.value, 'document_data')}
               variant={'small'} value={seat.document_data}/>
      </div>}
    </div>
  );
};
