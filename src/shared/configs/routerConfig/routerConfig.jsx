import { HomePage } from '@/pages/HomePage/HomePage.jsx';
import {TicketsPage} from "@/pages/TicketsPage/TicketsPage.jsx";

export const PagePaths = {
  HOMEPAGE: '/',
  TICKETS: '/tickets'
}


export const routerConfig = [
  {
    path: PagePaths.HOMEPAGE,
    component: HomePage,
  },{
  path: PagePaths.TICKETS,
    component: TicketsPage,
  }
]