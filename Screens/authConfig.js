export const msalConfig = {
    auth: {
      clientId: "2601b63e-4012-441c-a18d-d6d8e4cd6a29",
      authority: "https://login.microsoftonline.com/4b1b908c-5582-4377-ba07-a36d65e34934", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: " https://dfmpc-student-placement-system.firebaseapp.com/__/auth/handler",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com"
  };