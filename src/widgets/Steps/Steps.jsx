import './Steps.css'
import {Container} from "@/shared/ui/Container/Container.jsx";
import {Step} from "./Step.jsx";

export const Steps = () => {
  return (
    <section className={'steps'}>
      <Container>
        <ul className={'steps__list'}>
          <Step active>Билеты</Step>
          <Step>Пассажиры</Step>
          <Step>Оплата</Step>
          <Step last>Проверка</Step>
        </ul>
      </Container>
    </section>
  );
};
