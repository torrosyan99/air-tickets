import {Route, Routes} from 'react-router-dom';

import {routerConfig} from '@/shared/configs/routerConfig/routerConfig.jsx';
import {BookingTop} from "@/widgets/BookingTop/BookingTop.jsx";
import {BookingLayout} from "@/widgets/Layouts/BookingLayout.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      {
        routerConfig.main.map((route) => {
          const Component = route.component;
          return <Route key={route.path} element={<Component/>} path={route.path}/>
        })
      }
      <Route element={<BookingLayout/>}>
        {
          routerConfig.booking.map((route) => {
            const Component = route.component;
            return   <Route key={route.path} element={<Component/>} path={route.path}/>
          })
        }
      </Route>
    </Routes>
  );
};
