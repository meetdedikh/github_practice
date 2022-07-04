import { PrimaryButton, Stack } from "@fluentui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
const Header = () => {
  let navigate = useNavigate();
  function homeClick() {
    navigate("/");
  }
  function userProfileClick() {
    navigate("/userprofile");
  }
  function requestClick() {
    navigate("/request");
  }
  function friendListClick() {
    navigate("/friendlist");
  }
  function postListClick() {
    navigate("/addpost");
  }
  const { logout } = useContext(AuthContext);
  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <Stack
      style={{
        backgroundColor: " #892fc0",
        height: "100px",
        paddingBottom: "25px",
        paddingTop: "35px",
      }}
      horizontal
    >
      <Stack.Item style={{ marginLeft: "3%" }}>
        <PrimaryButton
          onClick={homeClick}
          style={{
            backgroundColor: "white",
            color: "Black",
            height: "30px",
            width: "100px",
          }}
        >
          Home
        </PrimaryButton>
      </Stack.Item>
      <Stack.Item style={{ marginLeft: "3%" }}>
      <PrimaryButton
        onClick={postListClick}
        style={{
          backgroundColor: "white",
          color: "Black",
          height: "30px",
          width: "100px",
        }}
      >
        Add Post
      </PrimaryButton>
    </Stack.Item>
      <Stack.Item style={{ marginLeft: "18px" }}>
        <PrimaryButton
          onClick={friendListClick}
          style={{
            backgroundColor: "white",
            color: "Black",
            height: "30px",
            width: "100px",
          }}
        >
          FRIENDLIST
        </PrimaryButton>
      </Stack.Item>
      <Stack.Item style={{ marginLeft: "18px" }}>
        <PrimaryButton
          onClick={requestClick}
          style={{
            backgroundColor: "white",
            color: "Black",
            height: "30px",
            width: "100px",
          }}
        >
          REQUEST
        </PrimaryButton>
      </Stack.Item>
      <Stack.Item style={{ marginLeft: "18px" }}>
        <PrimaryButton
          onClick={userProfileClick}
          style={{
            backgroundColor: "white",
            color: "Black",
            height: "37px",
            width: "120px",
          }}
        >
          USER PROFILE
        </PrimaryButton>
      </Stack.Item>
      <Stack.Item style={{ marginLeft: "18px" }}>
        <PrimaryButton
          onClick={onLogout}
          style={{
            backgroundColor: "white",
            color: "Black",
            height: "37px",
            width: "120px",
          }}
        >
          Logout
        </PrimaryButton>
      </Stack.Item>
      
    </Stack>
  );
};

export default Header;
