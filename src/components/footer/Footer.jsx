import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import footlogo from "./../../../public/assets/footlogo.png";
import call from "./../../../public/assets/call.png";
import gmail from "./../../../public/assets/gmail.png";
import net from "./../../../public/assets/net.png";
import ig from "./../../../public/assets/ig.svg";
import li from "./../../../public/assets/li.svg";

const Footer = () => {
  return (
    <div className={styles.container} id="footer">
      <div className={styles.col1}>
        <div className={styles.footHead}>Project By</div>
        <Image
          src={footlogo}
          alt="img"
          className={styles.footlogo}
          width={1000}
          placeholder="blur"
        />
        <div className={styles.policy}>
          <a href="/terms-conditions" className={styles.hlink}>
            Terms and Conditions
          </a>
        </div>
        <div className={styles.policy}>
          <a href="/refund-policy" className={styles.hlink}>
            Refund Policy
          </a>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.footHead2}>Contact Us</div>
        <div className={styles.cont}>
          <div className={styles.conta}>
            <Image src={call} alt="img" className={styles.footic} width={500} />
          </div>
          <div className={styles.contb}>+91 9922420555/7709860575</div>
        </div>

        <div className={styles.cont}>
          <div className={styles.conta}>
            <Image
              src={gmail}
              alt="img"
              className={styles.footic}
              width={500}
            />
          </div>
          <div className={styles.contb}>rajkalpresorts@gmail.com</div>
        </div>

        <div className={styles.cont}>
          <div className={styles.conta}>
            <Image src={net} alt="img" className={styles.footic} width={500} />
          </div>
          <div className={styles.contb}>www.rajkalpresorts.com</div>
        </div>
      </div>
      <div className={styles.col3}>
        <div className={styles.footHead2}>Send Enquiry</div>
        <form>
          <input type="text" placeholder="Name" className={styles.name} />
          <input
            type="text"
            placeholder="Contact No."
            className={styles.name}
          />
          <input type="email" placeholder="Email Id" className={styles.name} />
          <input type="text" placeholder="Message" className={styles.name} />
          <button className={styles.sendBtn}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
