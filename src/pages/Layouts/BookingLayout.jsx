import {BookingTop} from "@/widgets/BookingTop/BookingTop.jsx";
import {Outlet, useLocation} from "react-router-dom";
import {Steps} from "@/widgets/Steps/Steps.jsx";
import {Container} from "@/shared/ui/Container/Container.jsx";
import {Sidebar} from "@/widgets/Sidebar/Sidebar.jsx";
import {Filter} from "@/features/Filter/Filter.jsx";
import {LastTickets} from "@/widgets/LastTickets/LastTickets.jsx";
import {useEffect} from "react";

export const BookingLayout = () => {
  const {search} = useLocation();

  useEffect(() => {
    document.body.style.backgroundColor = "#F7F5F9";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <>
      <BookingTop/>
      <Steps/>
      <Container row>
        <Sidebar>
          <Filter/>
          <LastTickets/>
        </Sidebar>
        <Outlet/>
      </Container>
    </>
  );
};
