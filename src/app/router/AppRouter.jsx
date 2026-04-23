import { Route, Routes } from 'react-router-dom';

import { routerConfig } from '@/shared/configs/routerConfig/routerConfig.jsx';

export const AppRouter = () => {
  return (
    <Routes>
      {
        routerConfig.map((route) => {
          const Component = route.component;
          return <Route key={route.path} element={<Component/>} path={route.path}/>
        })
      }
    </Routes>
  );
};
