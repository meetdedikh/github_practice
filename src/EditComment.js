import {
  Link,
  Modal,
  PrimaryButton,
  Stack,
  StackItem,
  TextField,
} from "@fluentui/react";
import React, { useState } from "react";
import { useBoolean, useId } from "@fluentui/react-hooks";
const EditComment = ({ comment, userId }) => {
  const titleId = useId("title");
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);

  const [addComments, setAddComments] = useState({
    text: comment.text,
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAddComments({ ...addComments, [name]: value });
  };
  const updateSubmit = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      text: addComments.text,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/api/comments/${comment.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))

      .catch((error) => console.log("error", error));
    window.location.reload();
  };
  return (
    <div>
      {comment.userId == userId ? (
        <Link
          style={{
            marginLeft: 10,
            fontSize: "12px",
            border: "none",
            outline: "none",
          }}
          onClick={showModal}
        >
          Edit
        </Link>
      ) : (
        ""
      )}
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
      >
        <Stack>
          <StackItem
            style={{
              width: "500px",
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
              Update Commnents
            </h4>
          </StackItem>
          <Stack
            style={{
              marginLeft: "10px",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              onChange={handleInputs}
              value={addComments.text}
              name="text"
              label="Update Comment"
              placeholder="Enter your Descriptiosn"
              resizable={false}
              style={{ width: "350px" }}
            />
            <PrimaryButton
              style={{ margin: "5% 2% 0% 2%", height: "4.5vh" }}
              text="Update Comment"
              onClick={updateSubmit}
            />
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
};

export default EditComment;
