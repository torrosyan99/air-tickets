import {Container} from "@/shared/ui/Container/Container.jsx";
import {Logo} from "@/shared/ui/Logo/Logo.jsx";
import {Link} from "react-router-dom";

import './Header.css'

export const Header = () => {
  return (
    <header className="header">
      <Container>
        <Logo/>
      </Container>
      <nav className={'header__nav'}>
        <Container className="header__nav-inner">
          <Link className='header__link' to={'#about'}>
            О нас
          </Link>
          <Link className='header__link' to={"#about"}>
            Как это работает
        </Link>
          <Link className='header__link' to={'#reviews'}>
            Отзывы
        </Link>
          <Link className='header__link' to={'#contacts'}>
            Контакты
        </Link>
        </Container>
      </nav>
    </header>
  );
};
