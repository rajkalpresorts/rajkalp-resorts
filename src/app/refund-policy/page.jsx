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
          <p className={styles.head}>Refund Policy</p>
        </center>

        <p className={styles.para}>
          At Rajkalp Resorts & Precious Services, we strive to provide
          exceptional service and experiences to all our guests. We understand
          that circumstances may arise that require changes to your reservation,
          and we aim to accommodate such requests to the best of our ability.
          However, please note that refunds are not provided for reservations
          made with us. We encourage you to review the following details of our
          refund policy:
        </p>

        <p className={styles.head2}>Non-Refundable Membership Fee:</p>
        <p className={styles.para}>
          Upon signing up for membership with Rajkalp Resorts & Precious
          Services, a non-refundable membership fee of 5100/- is required. This
          fee grants access to various benefits and services outlined in our
          membership program.
        </p>

        <p className={styles.head2}>Reservation Cancellations:</p>
        <p className={styles.para}>
          Any cancellations of reservations made through our platform will not
          be eligible for a refund, regardless of the reason for cancellation.
          We understand that unexpected circumstances may arise that necessitate
          cancellation of your reservation. However, our policy remains
          non-negotiable in this regard.
        </p>

        <p className={styles.head2}>Modification of Reservations:</p>
        <p className={styles.para}>
          While we endeavor to accommodate modifications to reservations
          whenever possible, please note that changes to reservations may be
          subject to availability and additional charges. Modifications to
          reservations do not entitle guests to a refund of any fees or charges
          already paid.
        </p>

        <p className={styles.head2}>No-Shows:</p>
        <p className={styles.para}>
          In the event of a no-show, where a guest fails to arrive for a
          reservation without prior notification, no refunds will be provided
          for any fees or charges paid for the reservation.
        </p>

        <p className={styles.head2}>Customer Testimonials:</p>
        <p className={styles.para}>
          Testimonials provided by customers are their personal opinions and
          experiences and do not necessarily reflect the views of Rajkal Resorts
          & Precious Services.
        </p>

        <p className={styles.head2}>Force Majeure Events:</p>
        <p className={styles.para}>
          In the rare event of circumstances beyond our control, such as natural
          disasters, government regulations, or other force majeure events,
          Rajkalp Resorts & Precious Services reserves the right to cancel or
          modify reservations as necessary. In such cases, refunds will not be
          provided for any fees or charges paid for affected reservations.
        </p>

        <p className={styles.head2}>Discretionary Exceptions:</p>
        <p className={styles.para}>
          Rajkalp Resorts & Precious Services may, at its sole discretion,
          consider refund requests in exceptional circumstances on a
          case-by-case basis. Any exceptions to our refund policy will be
          granted at the discretion of management and are not guaranteed.
        </p>

        <p className={styles.head2}>Contact Us:</p>
        <p className={styles.para}>
          If you have any questions or concerns regarding our refund policy,
          please contact our customer support team for assistance.
        </p>

        <p className={styles.para}>
          By making a reservation with Rajkalp Resorts & Precious Services, you
          acknowledge and agree to abide by the terms of our refund policy as
          outlined above. We appreciate your understanding and cooperation in
          this matter as we continue to provide unparalleled service to our
          valued guests.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default page;
