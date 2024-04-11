import React from "react";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

function page() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.box}>
          <form>
            <input type="text" placeholder="Name" className={styles.name} />
            <input
              type="text"
              placeholder="Contact no"
              className={styles.name}
            />
            <input type="text" placeholder="Email id" className={styles.name} />
            <input type="text" placeholder="Address" className={styles.name} />
            <br />
            <div className={styles.date}>Date from: </div>
            <input
              type="date"
              placeholder="Date from"
              className={styles.name}
            />
            <br />
            <div className={styles.date}>Date to: </div>
            <input
              type="date"
              placeholder="Date from"
              className={styles.name}
            />

            <div className={styles.date}>Choose Plan:</div>
            <input
              className={styles.radio}
              type="radio"
              id="age1"
              name="age"
              value="30"
            />
            <label className={styles.pack} for="age1">
              Rs. 5,000
            </label>
            <br />
            <input type="radio" id="age2" name="age" value="60" />
            <label className={styles.pack} for="age2">
              Rs. 10,000
            </label>
            <br />
            <input type="radio" id="age3" name="age" value="100" />
            <label className={styles.pack} for="age3">
              Rs. 15,000
            </label>
            <br />
            <input type="radio" id="age3" name="age" value="100" />
            <label className={styles.pack} for="age3">
              Rs. 20,000
            </label>
            <br />
            <center>
              <button className={styles.submit}>Proceed to Payment</button>
            </center>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
