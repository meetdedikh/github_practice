import {
  DefaultButton,
  LabelBase,
  PrimaryButton,
  Stack,
  Modal,
  TextField,
  Label,
  StackItem,
} from "@fluentui/react";
import React, { useState } from "react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import moment from "moment";
import { ActivityItem, Icon, Link, mergeStyleSets } from "@fluentui/react";

import DeleteComment from "./DeleteComment";

const classNames = mergeStyleSets({
  exampleRoot: {
    marginTop: "20px",
  },
  nameText: {
    fontWeight: "bold",
  },
});

export const Comment = ({ comments, postId, userId }) => {
  const titleId = useId("title");

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);

  const [addComments, setAddComments] = useState({
    text: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAddComments({ ...addComments, [name]: value });
  };

  const handleSubmit = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      text: addComments.text,
      postId: postId,
      userId: userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8080/api/comments", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        hideModal();
      })
      .catch((error) => console.log("error", error));
    window.location.reload();
  };

  const getComments = () => {
    return comments.map((comment) => {
      return {
        key: 1,
        comment: comment,
        activityDescription: [
          <LabelBase
            key={1}
            style={{ color: "rgb(0 138 255)" }}
            className={classNames.nameText}
          >
            <b>{comment.user.fullname}</b>
          </LabelBase>,
          <span style={{ color: "rgb(249 8 8)" }} key={2}>
            {" "}
            : <b>commented</b>
          </span>,
        ],

        comments: [
          <Label style={{ color: "rgb(32, 31, 30)" }} key={1}>
            {comment.text}{" "}
          </Label>,
        ],

        timeStamp: moment(comment.createdAt).format("MMMM Do YY"),
      };
    });
  };

  return (
    <Stack
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "1%",
        marginTop: "1%",
      }}
    >
      <DefaultButton onClick={showModal} text="comment" />
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
              height: "100%",
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
              Commnents
            </h4>
            <div>
              {getComments().map((item, index) => (
                <div>
                  <ActivityItem
                    {...item}
                    key={index}
                    className={classNames.exampleRoot}
                  />
                  <DeleteComment comment={item.comment} userId={userId} />
                </div>
              ))}
            </div>
          </StackItem>
          <Stack
            style={{
              marginLeft: "10px",
              marginBottom: "10px",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <TextField
              onChange={handleInputs}
              value={addComments.text}
              name="text"
              label="AddComments"
              placeholder="Enter your Descriptiosn"
              resizable={false}
              style={{ width: "350px" }}
            />

            <PrimaryButton
              style={{ marginLeft: "2%", alignSelf: "flex-end" }}
              text="Add Commnet"
              onClick={handleSubmit}
            />
          </Stack>
        </Stack>
      </Modal>

      <LabelBase
        style={{
          fontSize: "xLarge",
          color: "neutralTertiary",
          marginLeft: "5%",
        }}
      >
        {comments.length}
      </LabelBase>
      <LabelBase
        style={{
          fontSize: "xLarge",
          color: "neutralTertiary",
          marginLeft: "5%",
        }}
      ></LabelBase>
    </Stack>
  );
};
