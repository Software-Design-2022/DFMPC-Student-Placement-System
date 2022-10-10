import React, { useState } from "react";
import MicrosoftLogin from "react-microsoft-login";

const LoginMicrosoft = () => {
    const [msalInstance, onMsalInstanceChange] = useState();
  
    const loginHandler = (err, data, msal) => {
      console.log(err, data);
      // some actions
      if (!err && data) {
        onMsalInstanceChange(msal);
      }
    };
  
    const logoutHandler = () => {
      msalInstance.logout();
    };
  
    return msalInstance ? (
      <button onClick={logoutHandler}>Logout</button>
    ) : (
      <MicrosoftLogin clientId={"2601b63e-4012-441c-a18d-d6d8e4cd6a29"} authCallback={loginHandler} />
    );
  };
  
  export default LoginMicrosoft;