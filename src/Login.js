import { Label, Link, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSetState } from "react-use";
import { AuthContext } from "./context/AuthContext";

const initialState = {
  emailID: "",
  password: "",
};
export const Login = () => {
  let navigate = useNavigate();
  function registerClick() {
    navigate("/register");
  }
  console.log("LoginPage");
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useSetState(initialState);
  
  const onSubmit = (e) => {
    e.preventDefault();
    const { emailID, password } = state;
    login(emailID, password);
    setState({
      emailID: "",
      password: "",
    });
  };
  return (
    <form>
    <Stack style={{ justifyContent: "center", alignItems: "center" }}>
      <Label
        style={{ color: "violet", fontWeight: "bolder", fontSize: "25px" }}
      >
        LOGIN
      </Label>
      <TextField
        onChange={(e) => setState({ emailID: e.target.value })}
        value={state.emailID}
        style={{ width: "250px" }}
        label="EmailID"
        placeholder="Enter your Register EmailId"
      />
      <TextField
        style={{ width: "220px" }}
        label="Password"
        type="password"
        canRevealPassword
        revealPasswordAriaLabel="Show password"
        value={state.password}
        onChange={(e) => setState({ password: e.target.value })}
        placeholder="Enter your valid password "
      />
      <Link onClick={registerClick}  underline style={{ padding: "10px", margin: "5px" }}>
      New user click here to access application
    </Link>
      <PrimaryButton
        style={{ padding: "5px", margin: "5px" }}
        text="SignIn"
        onClick={onSubmit}
      ></PrimaryButton>
      {isLoginPending && <div>Please wait...</div>}
      {isLoggedIn && <div>Success.</div>}
      {loginError && <div>{loginError.message}</div>}
    </Stack>
    
    </form>
  );
};