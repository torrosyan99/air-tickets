import { HomePage } from '@/pages/HomePage/HomePage.jsx';
import { TicketsPage } from '@/pages/TicketsPage/TicketsPage.jsx';
import {PassengersPage} from "@/pages/Passengers/PassengersPage.jsx";

export const PagePaths = {
  HOMEPAGE: '/',
  TICKETS: '/tickets',
  PASSENGERS: '/passengers',
}


export const routerConfig = {
  main: [
    {
      path: PagePaths.HOMEPAGE,
      component: HomePage,
    },
    {
      path: PagePaths.TICKETS,
      component: TicketsPage,
    }
  ],
  layout: [
    {
      path: PagePaths.PASSENGERS,
      component:
      PassengersPage,
    }
  ]
}