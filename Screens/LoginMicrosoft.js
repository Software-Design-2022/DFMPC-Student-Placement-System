import React from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-web";
import "../global";



export default (props) => {
  const navigation = useNavigation(); //navigation between screens

  const authHandler = (err, data) => {
    console.log(err, data);
    global.MSuser=data;
    console.log(global.MSuser);
    navigation.navigate("Dashboard")
  };
  return (
    <MicrosoftLogin clientId={"2601b63e-4012-441c-a18d-d6d8e4cd6a29"} authCallback={authHandler} />
  );
};