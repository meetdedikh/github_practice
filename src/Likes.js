import { LabelBase, PrimaryButton, Stack } from "@fluentui/react";

export const Likes = ({ likes, postId, userId, liked }) => {
  const handleLiked = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      postId: postId,
      userId: userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8080/api/likes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  };
  const handleUnliked = () => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/api/likes/${liked}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("unlike--===->>", result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  };

  return (
    <Stack
      style={{ flexDirection: "row", alignItems: "center", marginTop: "1%" }}
    >
      <PrimaryButton
        onClick={liked ? handleUnliked : handleLiked}
        style={{ width: "1%" }}
      >
        {liked ? "Unlike" : "Like"}
      </PrimaryButton>
      <LabelBase
        style={{
          fontSize: "xLarge",
          color: "neutralTertiary",
          marginLeft: "5%",
        }}
      >
        {likes.length}
      </LabelBase>
    </Stack>
  );
};
