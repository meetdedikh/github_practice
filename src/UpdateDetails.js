import {
  Modal,
  PrimaryButton,
  Stack,
  StackItem,
  TextField,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useBoolean, useId } from "@fluentui/react-hooks";

const UpdateDetails = ({ users }) => {
  const titleId = useId("title");
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
 
  let userId = localStorage.getItem("userId");
  const [user, setUser] = useState({
    userName: users.username,
    emailId: users.emailId,
    fullName: users.fullname,
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const updateSubmit = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      username: user.userName,
      fullname: user.fullName,
      emailId: user.emailId,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:8080/api/users/${userId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  };

  return (
    <div>
      <PrimaryButton onClick={showModal}>Account Setting</PrimaryButton>
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
      >
        <Stack style={{ marginBottom: "10%" }}>
          <StackItem
            style={{
              width: "300px",
              height: "5%",
              paddingLeft: "10px",
            }}
          >
            <h4
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Update Profile
            </h4>
          </StackItem>
          <Stack
            style={{
              marginLeft: "10px",

              alignItems: "center",
            }}
          >
            <TextField
              style={{ width: "250px" }}
              label="UserName"
              onChange={handleInputs}
              value={users.username}
              name="userName"
              required
            />
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
              label="EmailId"
              onChange={handleInputs}
              value={user.emailId}
              name="emailId"
              required
            />

            <PrimaryButton
              style={{ margin: "5% 2% 0% 2%", height: "4.5vh" }}
              text="Update Details"
              onClick={updateSubmit}
            />
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
};

export default UpdateDetails;
