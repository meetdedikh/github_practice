import { PrimaryButton, Stack } from "@fluentui/react";
import React, { useState } from "react";

export const DeletePost = ({ Item, postId, userId }) => {
  let deletepost = false;
  if (Item.userId == userId) {
    deletepost = true;
  }

  const deleteSubmit = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/api/posts/${postId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("Result", result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  };

  return (
    <Stack
      style={{ flexDirection: "row", alignItems: "center", marginTop: "1%" }}
    >
      {deletepost ? (
        <PrimaryButton
          onClick={deleteSubmit}
          style={{
            background: "RED",
            color: "white",
            width: "1%",
            marginLeft: "5%",
          }}
        >
          Delete
        </PrimaryButton>
      ) : (
        ""
      )}
    </Stack>
  );
};
