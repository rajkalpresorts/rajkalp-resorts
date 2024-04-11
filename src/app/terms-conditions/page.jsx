import React from "react";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

function page() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <center>
          <p className={styles.head}>
            Terms and Conditions of Rajkal Resorts & Precious Services
          </p>
        </center>
        <p className={styles.para}>
          Welcome to Rajkalp Resorts & Precious Services, where luxury meets
          investment, and every stay is a royal experience. By accessing or
          using our services, you agree to be bound by the following terms and
          conditions:
        </p>

        <p className={styles.head2}>Reservation and Payment:</p>
        <p className={styles.para}>
          Reservations can be made online through our website or by contacting
          our reservation desk. A non-refundable membership fee of 5100/- is
          required upon signup. <br />
          Payment for reservations must be made in full at the time of booking.
        </p>

        <p className={styles.head2}>Cancellation and Refunds:</p>
        <p className={styles.para}>
          Cancellation policies vary depending on the type of reservation and
          time of cancellation. Please refer to the specific cancellation policy
          associated with your booking. Refunds, if applicable, will be
          processed according to the cancellation policy in place at the time of
          booking.
        </p>

        <p className={styles.head2}>Amenities and Services:</p>
        <p className={styles.para}>
          Our resort offers a range of luxurious amenities, including swimming
          pools, safari bookings, banquet services, restaurant facilities, and a
          clubhouse for indoor activities and events. While we strive to provide
          all advertised amenities, certain services may be subject to
          availability or seasonal closure.
        </p>

        <p className={styles.head2}>Jungle Safari and Activities:</p>
        <p className={styles.para}>
          Guests can enjoy jungle safaris, bird watching, and nature walks
          during their stay. Participation in activities is subject to
          availability and may require advance booking.
        </p>

        <p className={styles.head2}>Customer Testimonials:</p>
        <p className={styles.para}>
          Testimonials provided by customers are their personal opinions and
          experiences and do not necessarily reflect the views of Rajkal Resorts
          & Precious Services.
        </p>

        <p className={styles.head2}>Membership Benefits:</p>
        <p className={styles.para}>
          Membership benefits include a 5-day free stay and access to 12
          complimentary programs. Additional perks may be available based on
          membership status and participation in loyalty programs.
        </p>

        <p className={styles.head2}>Privacy and Security:</p>
        <p className={styles.para}>
          We are committed to protecting the privacy and security of our
          customers' personal information. Please refer to our Privacy Policy
          for more information. Users are responsible for maintaining the
          confidentiality of their login credentials and for all activities that
          occur under their account.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default page;
