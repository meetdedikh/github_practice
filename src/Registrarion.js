import { Label, Link, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registrarion = () => {
  let navigate = useNavigate();

  function loginClick() {
    navigate("/");
  }

  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    emailID: "",
    password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(setUser);
  };
  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fullname: user.fullName,
      emailId: user.emailID,
      username: user.userName,
      password: user.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/users", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("res=====>", result))
      .catch((error) => console.log("error", error));
    console.log("---->user",user);
  if(user.userName === null && user.fullName === null && user.emailID === null && user.password === null )
  {
    alert();
  }
  else{
    navigate("/")
  }
  };

  return (
    <Stack
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
        margin: "5%",
      }}
    >
      <Label
        style={{ color: "violet", fontWeight: "bolder", fontSize: "25px" }}
      >
        Registration
      </Label>
      <TextField
        style={{ width: "250px" }}
        label="Full Name"
        onChange={handleInputs}
        value={user.fullName}
        name="fullName"
        required
      />
      <TextField
        style={{ width: "250px" }}
        label="UserName"
        onChange={handleInputs}
        value={user.userName}
        name="userName"
        required
      />
      <TextField
        style={{ width: "250px" }}
        label="EmailId"
        type="email"
        onChange={handleInputs}
        value={user.emailID}
        name="emailID"
        required
      />

      <TextField
        style={{ width: "220px" }}
        label="Password"
        type="password"
        canRevealPassword
        revealPasswordAriaLabel="Show password"
        onChange={handleInputs}
        value={user.password}
        name="password"
        required
      />
      <Link
        onClick={loginClick}
        underline
        style={{ padding: "10px", margin: "5px" }}
      >
        Already have an account
      </Link>
      <PrimaryButton
        style={{ padding: "10px", margin: "20px" }}
        text="SignUp"
        onClick={handleSubmit}
      ></PrimaryButton>
    </Stack>
  );
};
