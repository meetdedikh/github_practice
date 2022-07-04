import { Link, Stack } from "@fluentui/react";

import _ from "lodash";

import EditComment from "./EditComment";
const DeleteComment = ({ comment, userId }) => {
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

    fetch(`http://localhost:8080/api/comments/${comment.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("Result", result))

      .catch((error) => console.log("error", error));
    window.location.reload();
  };

  return (
    <Stack style={{ flexDirection: "row", margin: "1% 0 0 0" }}>
      <EditComment comment={comment} userId={userId} />
      {comment.userId == userId ? (
        <Link
          onClick={deleteSubmit}
          style={{ margin: "0.5% 0 0 2%", fontSize: "12px" }}
        >
          Delete
        </Link>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default DeleteComment;
