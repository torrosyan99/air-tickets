import { AppRouter } from './router/AppRouter.jsx';

import './style/fonts.css'
import './style/reset.css'
import 'swiper/css';
import 'swiper/css/pagination';
import './style/main.css'
import {Header} from "@/widgets/Header/Header.jsx";
import {Footer} from "@/widgets/Footer/Footer.jsx";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main className={'main'}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};
