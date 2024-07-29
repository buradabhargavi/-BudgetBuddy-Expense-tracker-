import React, { useState } from "react";
import { Button } from "@mui/material";
function VerifyEmail() {
  const [userData, setUserData] = useState("");
  const handleChange = (event) => {
    setUserData(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const verifyData = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAq3UUsh6wr0Dnf9bCJBO7TfxPTIzPkPbY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("Token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    alert("Verification email has been send to your Mail");
    const verifyEmail = await verifyData.json();
    setUserData(verifyEmail.email);
  };
  return (
    <div>
      <Button onClick={submitHandler}>Verification</Button>
    </div>
  );
}

export default VerifyEmail;
