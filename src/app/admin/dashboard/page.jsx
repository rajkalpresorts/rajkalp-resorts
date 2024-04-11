"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [verified, setVerified] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const verifyToken = () => {
      try {
        axios.get("/api/auth/verify-token");
        setVerified(true);
      } catch (error) {
        setVerified(false);
        router.push("/admin/login");
      }
    };
    verifyToken();
  }, []);

  if (!verified) {
    return <div>You are not verified to see the contents of this page!</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "80vh",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <h1>Welcome to Admin Portal!</h1>
    </div>
  );
};

export default Dashboard;
