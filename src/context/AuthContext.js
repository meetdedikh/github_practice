import React, { useEffect } from "react";
import { useSetState } from "react-use";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
};

export const ContextProvider = (props) => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log("token====>", token);
    if (token) {
      setLoginSuccess(true);
    }
  }, []);

  const login = (emailID, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(emailID, password, (error) => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const fetchLogin = (emailID, password, callback) =>
  setTimeout(() => {
    var raw = JSON.stringify({
      emailId: emailID,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8080/api/login", requestOptions)
      .then((response) => {
        response.text().then((result) => {
          let data = JSON.parse(result);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("fullname", data.fullname);
          if (data.token) {
            localStorage.setItem("token", data.token);
            return callback(null);
          } else {
            return callback(new Error("Invalid email and password"));
          }
        });
      })
      .catch((error) => console.log(error));
  }, 1000);
