import React from "react";

const SignUpForm = props => {
  return (
    <div className="Inner-SignUp">
      <div className="signUp-Title">
        {props.signType === "Create" && (
          <div>Sign Up to Post on BootChamp!</div>
        )}
        {props.signType === "SignIn" && <div>Welcome Back, Sign In Below!</div>}
      </div>
      {props.signType === "Create" && (
        <input
          type="text"
          placeholder="UserName"
          className="frm-itm"
          value={props.userName}
          onChange={e => props.setUserName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="frm-itm"
        value={props.email}
        onChange={e => props.setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="frm-itm"
        value={props.password}
        onChange={e => props.setPassword(e.target.value)}
      />
    </div>
  );
};

export default SignUpForm;
