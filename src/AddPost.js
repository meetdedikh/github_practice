import { Label, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export const AddPost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value });
  };
  let navigate = useNavigate();
  const handleSubmit = () => {
    let token = localStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      title: post.title,
      description: post.description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8080/api/posts", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    if (post.title === null && post.description === null) {
      return new Error("Invalid email and password");
    } else {
      navigate("/");
    }
  };
  return (
    <form>
      <Header />
      <Stack style={{ justifyContent: "center", alignItems: "center" }}>
        <Label
          style={{ color: "violet", fontWeight: "bolder", fontSize: "25px" }}
        >
          Add Your Post
        </Label>
        <TextField
          onChange={handleInputs}
          value={post.title}
          name="title"
          style={{ width: "250px" }}
          label="Post Title"
          placeholder="Enter your Title"
        />

        <TextField
          onChange={handleInputs}
          value={post.description}
          name="description"
          style={{ width: "250px" }}
          label="Post Description"
          placeholder="Enter your Description"
          multiline
          resizable={false}
        />
        <PrimaryButton
          style={{ padding: "5px", margin: "5px" }}
          text="AddPost"
          onClick={handleSubmit}
        ></PrimaryButton>
      </Stack>
    </form>
  );
};
