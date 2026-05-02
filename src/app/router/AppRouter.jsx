import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/pages/Layouts/Layout.jsx';
import { routerConfig } from '@/shared/configs/routerConfig/routerConfig.jsx';
import { BookingTop } from '@/widgets/BookingTop/BookingTop.jsx';


export const AppRouter = () => {
  return (
    <Routes>
      {
        routerConfig.main.map((route) => {
          const Component = route.component;
          return <Route key={route.path} element={<Component/>} path={route.path}/>
        })
      }
      <Route element={<Layout/>}>
        {
          routerConfig.layout.map((route) => {
            const Component = route.component;
            return   <Route key={route.path} element={<Component/>} path={route.path}/>
          })
        }
      </Route>
    </Routes>
  );
};
