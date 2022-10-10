import React, { useState, useEffect } from "react";
import {
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableHighlight,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Alert,
  Image,
} from "react-native";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";


import "../global";

const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
const SPACING = 20;
const image = { uri: "https://reactjs.org/logo-og.png" };

const Login = () => {
 
  //Login Screen
  const [email, setEmail] = useState(""); //email
  const [password, setPassword] = useState(""); //password
  const navigation = useNavigation(); //navigation between screens

  function showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  function setUserVariables(data) {
    // store information about the user who is currently logged in
    authUser = data;
    authUserID = data.child("id").val();
    //authStudentNumber= authUser.child("")user_FirstName

    authName = authUser.child("user_FirstName").val();
    authLastName = authUser.child("user_LastName").val();
    authUserProfilePic = authUser.child("user_profile_photo/").val();
    authUserRef = firebase.database().ref("/users") + "/" + authUserID + "/";
    console.log("User ID: " + authUserID + " authenticated.");
  }

  const LoginFirebase = () => {
    // login with email and password

    // check if email exists in the database if so then hash pass and compare
    /* var found = false;
    var snapshot = firebase
    .firestore()
    .collection("users") // Get collection of protocols
    .get() // Get all items in collection
    .then((querySnapshot) => {
    
   // For each item in collection
   querySnapshot.forEach(function (doc) {
    // For each item in collection
      if(doc.data().email===email){
        found = true;
        // user exists
        if(doc.data().password_digest===password){
          setUserVariables(doc.data()); // so that we can keep track of who is logged in currenctly
          console.log(
            "User authenticated sucessfully! Storing variables..."
          );
          navigation.navigate("Dashboard");
        } else {
          showAlert(
            "Password Error",
            "Your email and password do not match"
          );
        
        }
      }
      
  });
  if (found === false) {
    showAlert("Email Error", "user does not exist");
  }
});
 */


    var found = false;
    firebase
      .database()
      .ref("/users")
      .on("value", (snapshot) => {
        const key = snapshot.forEach(function (data) {
          const check_email = snapshot.child(data.key + "/email").val();

          const encrypted = snapshot.child(data.key + "/password_digest").val();
          if (check_email === email) {
            // compare entered email with current email on the snapshot

            found = true; // sets found to true when we have found a matching email int the database

            if (encrypted === password) {
              // compares entered password to the password for the corresponding user in the database
              setUserVariables(data); // so that we can keep track of who is logged in currenctly
              console.log(
                "User authenticated sucessfully! Storing variables..."
              );
              navigation.navigate("Dashboard");
            } else {
              showAlert(
                "Password Error",
                "Your email and password do not match"
              );
            }
          }
        });
        if (found === false) {
          showAlert("Email Error", "user does not exist");
        }
      });
  };
  // this allows you to switch between different screens

  return (
    //TouchableWithoutFeedback - when i click anywhen outside od the keyboard, the keyboard will disappear

    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      style={styles.container}
      // needs fixing // when keyboard appers things move up a bit
    >
      <View>
        <Image
          source={{
            uri: "https://www.wits.ac.za/media/wits-university/news-and-events/images/logos-and-icons/Wits-Logo-Mono-Neg-Legal-600x300.png",
          }}
          style={{ width: 300, height: 150 }}
        ></Image>
      </View>
      <View style={styles.inputStyle}>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)} //  set email to what the text is
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)} // set password to what the text is
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>
      <View style={{ paddingTop: 12, width: "40%" }}>
        <LinearGradient
          colors={[
            "rgba(28,72,123,255)",
            " rgba(28,72,123,255))",
            "rgba(28,72,123,255)",
          ]}
          style={styles.linearGradient}
        >
          <TouchableOpacity
            onPress={() => {
              LoginFirebase();
            }} // when user clicks on login button
          >

            
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
        </LinearGradient>
        
        
      
      </View>
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
    
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(28,56,107,255)",
  },

  inputStyle: {
    width: "60%",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    marginTop: 15,
  },
  linearGradient: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 6,
    borderWidth: 0,
    marginTop: 10,
    borderColor: "rgba(28,72,123,255)",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    backgroundColor: "transparent",
  },
});
