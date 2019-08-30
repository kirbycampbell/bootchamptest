import React, { useState, useEffect } from "react";
import GoogleComp from "./GoogleComp";
import SignIn from "./SignIn";
import CreateUser from "./CreateUser";
import SignUpForm from "./SignUpForm";
import "./AuthUser.css";
import AuthButtons from "./AuthButtons";
import Loader from "./../Loader/Loader";
import { Redirect } from "react-router";

const AuthUser = props => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signType, setSignType] = useState("Create");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [userName, password, email]);

  if (props.auth) return <Redirect to="/" />;
  if (!props.auth) {
    const localFns = {
      userName,
      setUserName,
      setEmail,
      setPassword,
      setSignType,
      email,
      password,
      signType,
      setLoading,
      loading,
      setError,
      setMessage
    };
    return (
      <div className={"Outer-SignUp " + (loading ? "loading" : "")}>
        {loading && (
          <div className="Load-Spinner">
            <Loader />
          </div>
        )}
        <SignUpForm {...localFns} />

        <div className={"Error-Msg " + (error.length > 4 ? "show" : "hide")}>
          {error}
        </div>
        <div className={"Message " + (message.length > 4 ? "show" : "hide")}>
          {message}
        </div>
        <div className="btn-section">
          {signType === "Create" && <CreateUser {...localFns} />}
          {signType === "SignIn" && <SignIn {...localFns} />}
          <GoogleComp {...localFns} />
        </div>
        <AuthButtons {...localFns} />
      </div>
    );
  }
};

export default AuthUser;
