import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Button from "react-bootstrap/Button";


/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Button>
    );
}