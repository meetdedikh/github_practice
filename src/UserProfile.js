import { Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import UpdateDetails from "./UpdateDetails";

import UserPost from "./UserPost";

export const UserProfile = () => {
  let userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const getData = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/api/users/${userId}`, requestOptions)
      .then((response) => {
        response.text().then((result) => {
          let data = JSON.parse(result);

          setUsers(data);
        });
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getData(users);
  }, []);

  return (
    <Stack>
      <Header />

      <Stack style={{ margin: "10px 10px 10px 10px" }}>
        <ul>
          <div>
            <li>UserName: {users.username}</li>
            <br></br>
            <li>FullName:{users.fullname}</li>
            <br></br>
            <li>EmailID:{users.emailId}</li>
            <br></br>
          </div>
          <UpdateDetails users={users} />
        </ul>

        <UserPost />
      </Stack>
    </Stack>
  );
};
