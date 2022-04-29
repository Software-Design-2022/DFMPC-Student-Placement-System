import React, { useState, useEffect } from "react";
import {
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Alert,
} from "react-native";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  function showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          // onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  const LoginFirebase = () => {
    // login with email and password

    // check if email exists in the database if so then hash pass and compare

    var found = false;
    firebase
      .database()
      .ref("/users")
      .on("value", (snapshot) => {
        //if(snapshot.val()==email)
        const key = snapshot.forEach(function (data) {
          const check_email = snapshot.child(data.key + "/email").val();

          const encrypted = snapshot.child(data.key + "/password_digest").val();

          if (check_email === email) {
            found = true;

            if (encrypted === password) {
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
      <Text style={styles.SPSStyle}>Student Placement System</Text>
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

      <View style={styles.btnStyle}>
        <TouchableOpacity
          onPress={LoginFirebase} // when user clicks on login button
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
  },

  inputStyle: {
    width: "60%",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  btnStyle: {
    width: "30%",
    backgroundColor: "white",
    marginTop: 50,
    borderColor: "lightblue",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },
  SPSStyle: {
    backgroundColor: "grey",
    marginTop: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
  },
});
