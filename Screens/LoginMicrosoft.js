import React from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-web";
import "./global";
import { firebase } from "../firebase";


export function setUserVariables(data) {
  // store information about the user who is currently logged in
  authUser = data;
  console.log(data);
  authUserID = data.child("id").val();
  //authStudentNumber= authUser.child("")user_FirstName

  //global user variables to be accessed through app
  authName = authUser.child("user_FirstName").val();
  authLastName = authUser.child("user_LastName").val();
  authUserProfilePic = authUser.child("user_profile_photo/").val();
  authUserRef = firebase.database().ref("/users") + "/" + authUserID + "/";
  console.log("User ID: " + authUserID + " authenticated.");
  
}

export function retrieveUser() {
  firebase
    .database()
    .ref("/users")
    .on("value", (snapshot) => {
      const key = snapshot.forEach(function (data) {
        const check_email = snapshot.child(data.key + "/microsoft_email").val();

        if (check_email === authEmail) {
          // compare entered email with current email on the snapshot

          setUserVariables(data); // so that we can keep track of who is logged in currenctly

          
        }
      });
    });
};



export default (props) => {
  const navigation = useNavigation(); //navigation between screens

  const authHandler = (err, data) => {
    //save microsoft user data
    MSuser = data;
    console.log(MSuser.account.userName);
    //set user email to temp outlook email for database
    authEmail = "john_green_test@outlook.com";
    //once successfull navigate to dashboard
    navigation.navigate("Dashboard");
    retrieveUser();
  };
  return (
    //Microsoft button displayed for sign in
    <MicrosoftLogin clientId={"2601b63e-4012-441c-a18d-d6d8e4cd6a29"} authCallback={authHandler} />
  );
};

