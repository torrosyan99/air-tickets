import './HowItWork.css'

import { Button } from '@/shared/ui/Button/Button.jsx';
import { Container } from '@/shared/ui/Container/Container.jsx';
import { Title } from '@/shared/ui/Title/Title.jsx';

import { HowItWorkList } from './HowItWorkList.jsx';


export const HowItWork = () => {
  return (
    <section className="how-it-work" id={'how-it-work'}>
      <Container>
        <div className={'how-it-work__top'}>
          <Title>КАК ЭТО РАБОТАЕТ</Title>
          <Button variant={'ghost'} color={'white'}>
            Узнать больше
          </Button>
        </div>
        <HowItWorkList/>
      </Container>
    </section>
  );
};
