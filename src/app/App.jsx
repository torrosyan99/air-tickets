import {AppRouter} from './router/AppRouter.jsx';

import './style/reset.css'

export const App = () => {
  return (
    <>
      <main className={'main'}>
        <AppRouter />
      </main>
    </>
  );
};
