import React from "react";
import { SignUp } from '../../components/login/SignUp';
type _react = typeof React


export const Home = ({ }) => {
  //const { t } = useTranslation();

  function handleSignUp() {

  }

  function handleLogIn() {

  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      HOME PAGE <br />
      <button onClick={handleSignUp}>SIGNUP</button>
      <SignUp />
      <button onClick={handleLogIn}>LOGIN</button>
    </div >
  );
};