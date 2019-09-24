import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleComp from "./GoogleComp";
import SignIn from "./SignIn";
import CreateUser from "./CreateUser";
import SignUpForm from "../../Functional_Components/Forms/User/SignUpForm";
import "./AuthUser.css";
import AuthButtons from "../../Functional_Components/Buttons/AuthButtons";
import Loader from "../../Functional_Components/Loader/Loader";
import { Redirect } from "react-router";

const AuthUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signType, setSignType] = useState("Create");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector(state => state.UserStore.auth);

  useEffect(() => {
    setError("");
  }, [userName, password, email]);

  if (auth) return <Redirect to="/" />;
  if (!auth) {
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
