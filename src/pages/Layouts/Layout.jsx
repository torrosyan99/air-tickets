import {useEffect} from "react";

import {Sidebar} from "@/widgets/Sidebar/Sidebar.jsx";
import {Steps} from "@/widgets/Steps/Steps.jsx";
import {BookingTop} from "@/widgets/BookingTop/BookingTop.jsx";

import {Container} from "@/shared/ui/Container/Container.jsx"
import {Outlet} from "react-router-dom";
import {Details} from "@/widgets/Details/Details.jsx";


export const Layout = () => {

  useEffect(() => {
    document.body.style.backgroundColor = '#F7F5F9';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);


  if (false) return <BookingTop/>;

  return (
    <>
      <BookingTop/>
      <Steps/>
      <Container row>
        <Sidebar>
<Details />
        </Sidebar>
        <Outlet />
      </Container>
    </>
  );
}
