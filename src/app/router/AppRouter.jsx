import {Route, Routes} from 'react-router-dom';

import {routerConfig} from '@/shared/configs/routerConfig/routerConfig.jsx';

export const AppRouter = () => {
  return (
    <Routes>
      {
        routerConfig.map(({path, component:Component}) => (
          <Route key={path} element={<Component />} path={path} />
        ))
      }
    </Routes>
  );
};
