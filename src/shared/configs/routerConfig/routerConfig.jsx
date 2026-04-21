import {HomePage} from '@/pages/HomePage/HomePage.jsx';

export const PagePaths = {
  HOMEPAGE: '/',
}


export const routerConfig = [
  {
    path: PagePaths.HOMEPAGE,
    component: HomePage,
  }
]