"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/payment/phonepe-integration", {
        userId: "6627f88c04efce4761a1efdd",
        amount: 10000,
        plan: "plan1",
      });
      router.push(res.data.redirectUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Shop Now</button>
    </div>
  );
};

export default page;
