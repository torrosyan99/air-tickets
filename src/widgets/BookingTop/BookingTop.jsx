import './BookingTop.css'
import {Container} from "@/shared/ui/Container/Container.jsx";
import {BookingForm} from "@/features/BookingForm/BookingForm.jsx";

export const BookingTop = () => {
  return (
    <section className={'booking-top'}>
      <Container>
        <BookingForm horizontal />
      </Container>
    </section>
  );
};
