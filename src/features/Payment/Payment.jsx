import './Payment.css';
import {Input} from "@/shared/ui/Input/Input.jsx";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox.jsx";
import {Button} from "@/shared/ui/Button/Button.jsx";
import {useForm, Controller} from "react-hook-form";
import {useDispatch} from "react-redux";
import {ticketActions} from "@/entities/train/model/ticketSlice.js";
import {useNavigate} from "react-router-dom";
import {PagePaths} from "@/shared/configs/routerConfig/routerConfig.jsx";

/**
 * Phone mask: +7 (999) 999-99-99
 */
const formatPhone = (value = "") => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  let result = "+7";

  if (digits.length > 1) {
    const rest = digits.slice(1);

    if (rest.length > 0) result += " (" + rest.slice(0, 3);
    if (rest.length >= 3) result += ") " + rest.slice(3, 6);
    if (rest.length >= 6) result += "-" + rest.slice(6, 8);
    if (rest.length >= 8) result += "-" + rest.slice(8, 10);
  }

  return result;
};

export const Payment = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    setValue,
    control,
    register,
    handleSubmit,
    watch,
    formState: {isValid},
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      patronymic: "",
      phone: "+7",
      email: "",
      paymentType: "online",
    },
  });

  const paymentType = watch("paymentType");

  const onSubmit = (data) => {
    dispatch(ticketActions.saveInfo({
      'first_name': data.firstName,
      'last_name': data.lastName,
      patronymic: data.patronymic,
      phone: data.phone,
      email: data.email,
      'payment_method': data.paymentType,
    }));

    navigate(PagePaths.RESULT);
  };

  return (
    <div className="payment">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className={'payment__form-main'}>

          {/* PERSONAL DATA */}
          <div className="payment__top">
            <h3 className={'payment__title'}>Персональные данные</h3>
          </div>

          <div className={'payment__content'}>

            <div className={'payment__inputs'}>

              <div className={'payment__item'}>
                <label className={'payment__label'}>Фамилия</label>
                <Input
                  variant="small"
                  {...register("lastName", {
                    required: "Введите фамилию",
                  })}
                />
              </div>

              <div className={'payment__item'}>
                <label className={'payment__label'}>Имя</label>
                <Input
                  variant="small"
                  {...register("firstName", {
                    required: "Введите имя",
                  })}
                />
              </div>

              <div className={'payment__item'}>
                <label className={'payment__label'}>Отчество</label>
                <Input
                  variant="small"
                  {...register("patronymic")}
                />
              </div>

            </div>

            {/* PHONE */}
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Введите телефон",
                minLength: {
                  value: 18,
                  message: "Введите полный номер",
                },
              }}
              render={({field, fieldState}) => (
                <div className={'payment__item payment__contact'}>
                  <label className={'payment__label'}>
                    Контактный телефон
                  </label>

                  <Input
                    variant="small"
                    placeholder="+7 (___) ___-__-__"
                    value={field.value || "+7"}
                    onChange={(e) => {
                      field.onChange(formatPhone(e.target.value));
                    }}
                    errorBorder={!!fieldState.error}
                  />
                </div>
              )}
            />

            {/* EMAIL */}
            <div className={'payment__item payment__email'}>
              <label className={'payment__label'}>
                E-mail
              </label>

              <Input
                variant="small"
                placeholder="inbox@gmail.ru"
                {...register("email", {
                  required: "Введите email",
                })}
              />
            </div>

          </div>

          {/* PAYMENT TYPE */}
          <div className="payment__top">
            <h3 className={'payment__title'}>Способ оплаты</h3>
          </div>

          <div className={'payment__online'}>
            <Checkbox
              label="Онлайн"
              checked={paymentType === "online"}
              onClick={() => {
                setValue("paymentType", "online", {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />

            <div className={'payment__variants'}>
              <span>Банковской<br/> картой</span>
              <span>PayPal</span>
              <span>Visa QIWI Wallet</span>
            </div>
          </div>

          <div className={'payment__cash'}>
            <Checkbox
              label="Наличными"
              checked={paymentType === "cash"}
              onClick={() => {
                console.log('click')
                setValue("paymentType", "cash", {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </div>

        </div>

        <Button
          className={'payment__button'}
          color={'white'}
          disabled={!isValid}
        >
          КУПИТЬ БИЛЕТЫ
        </Button>

      </form>
    </div>
  );
};