import {BookingTop} from "@/widgets/BookingTop/BookingTop.jsx";
import {Outlet, useLocation} from "react-router-dom";
import {Steps} from "@/widgets/Steps/Steps.jsx";

export const BookingLayout = () => {
  const {search} = useLocation()
  console.log(search);
  return (
    <>
      <BookingTop/>
      <Steps />
      <Outlet/>
    </>
  );
};
