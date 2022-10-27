import React, { useEffect } from "react";
import { AuthResponse, AuthError, UserAgentApplication } from "msal";
import { User } from "@microsoft/microsoft-graph-types";

import MicrosoftLoginButton, {
  MicrosoftLoginButtonTheme,
} from "./MicrosoftLoginButton";
import { checkToIE, getLogger, getScopes, getUserAgentApp } from "./helpers";

const MicrosoftLoginPrompt = "login" | "select_account" | "consent" | "none";
const MicrosoftLoginProps =()=>{

  clientId: string;
  authCallback: (function (error, result, instance) { 
    
});

  graphScopes,
  tenantUrl,
  postLogoutRedirectUri,
  buttonTheme,
  withUserData,
  debug,
  className,
  prompt,
  forceRedirectStrategy,
  redirectUri,
  useLocalStorageCache
}

const MicrosoftLogin = ({
  graphScopes,
  clientId,
  tenantUrl,
  redirectUri,
  postLogoutRedirectUri,
  children,
  buttonTheme,
  className,
  withUserData = false,
  authCallback,
  forceRedirectStrategy = false,
  prompt,
  debug,
  useLocalStorageCache,
}) => {
  const msalInstance = getUserAgentApp({
    clientId,
    tenantUrl,
    redirectUri,
    postLogoutRedirectUri,
    useLocalStorageCache,
  });
  const scopes = getScopes(graphScopes);
  const log = getLogger(debug);

  if (!msalInstance) {
    log("Initialization", "clientID broken or not provided", true);
    return null;
  }

  useEffect(() => {
    msalInstance.handleRedirectCallback(
      (error, authResponse) => {
        if (!error && authResponse) {
          log("Fetch Azure AD 'token' with redirect SUCCEEDED", authResponse);
          log("Fetch Graph API 'access_token' in silent mode STARTED");
          getGraphAPITokenAndUser(true);
        } else {
          log("Fetch Azure AD 'token' with redirect FAILED", error, true);
          authCallback(error);
        }
      }
    );
  }, []);

  // attempt silent login
  // return msalInstance to user login handler on reload if token is present
  useEffect(() => {
    const clientToken = useLocalStorageCache
      ? sessionStorage.getItem("msal.idtoken")
      : localStorage.getItem("msal.idtoken");

    clientToken && getGraphAPITokenAndUser(forceRedirectStrategy || checkToIE());
  }, [msalInstance]);

  const login = () => {
    log("Login STARTED");
    if (forceRedirectStrategy || checkToIE()) {
      redirectLogin();
    } else {
      popupLogin();
    }
  };

  const finalStep = (authResponseWithAccessToken) => {
    log(
      "Fetch Graph API 'access_token' SUCCEEDED",
      authResponseWithAccessToken
    );
    if (withUserData) {
      getUserData(authResponseWithAccessToken);
    } else {
      log("Login SUCCEEDED");
      authCallback(null, authResponseWithAccessToken, msalInstance);
    }
  };

  const getGraphAPITokenAndUser = async (isRedirect) => {
    try {
      try {
        const silentRes = await msalInstance.acquireTokenSilent({ scopes });
        finalStep(silentRes);
      } catch (err) {
        log(
          "Fetch Graph API 'access_token' in silent mode is FAILED",
          err,
          true
        );
        if (isRedirect) {
          log("Fetch Graph API 'access_token' with redirect STARTED");
          msalInstance.acquireTokenRedirect({ scopes });
        } else {
          log("Fetch Graph API 'access_token' with popup STARTED");
          const popupRes = await msalInstance.acquireTokenPopup({ scopes });
          finalStep(popupRes);
        }
      }
    } catch (error) {
      log("Login FAILED", error, true);
      authCallback(error);
    }
  };

  const popupLogin = async () => {
    log("Fetch Azure AD 'token' with popup STARTED");
    try {
      const authResponse = await msalInstance.loginPopup({ scopes, prompt });
      log("Fetch Azure AD 'token' with popup SUCCEEDED", authResponse);
      log("Fetch Graph API 'access_token' in silent mode STARTED");
      getGraphAPITokenAndUser();
    } catch (err) {
      log("Fetch Azure AD 'token' with popup FAILED", err, true);
      authCallback(err);
    }
  };

  const redirectLogin = () => {
    log("Fetch Azure AD 'token' with redirect STARTED");
    msalInstance.loginRedirect({ scopes, prompt });
  };

  const getUserData = async (authResponseWithAccessToken) => {
    const { accessToken } = authResponseWithAccessToken;
    log("Fetch Graph API user data STARTED");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me",
      options
    );
    const userData = await response.json();
    log("Fetch Graph API user data SUCCEEDED", userData);
    log("Login SUCCEEDED");
    authCallback(
      null,
      {
        ...userData,
        ...authResponseWithAccessToken,
      },
      msalInstance
    );
  };

  return children ? (
    <div onClick={login}>{children}</div>
  ) : (
    <MicrosoftLoginButton
      buttonTheme={buttonTheme || "light"}
      buttonClassName={className}
      onClick={login}
    />
  );
};

export default MicrosoftLogin;