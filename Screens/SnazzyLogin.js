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
  Dimensions,
  Linking,
} from "react-native";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  EasingNode,
  Value,
  Extrapolate,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import "./global";

const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
const SPACING = 20;
const image = { uri: "https://reactjs.org/logo-og.png" };

const { width, height } = Dimensions.get("window");

//alert for if login fails
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

//retrieve user variables from database
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
/**Function to login to firebase
 * * when login is pressed
 * @type {function}
 */
const LoginFirebase = (email, password, navigation) => {
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
            console.log("User authenticated sucessfully! Storing variables...");
            navigation.navigate("Dashboard");
          } else {
            showAlert("Password Error", "Your email and password do not match");
          }
        }
      });
      if (found === false) {
        showAlert("Email Error", "user does not exist");
      }
    });
};

export default function SnazzyLogin() {
  const [email, setEmail] = useState("john@gmail.com"); //email
  const [password, setPassword] = useState("John_pass123"); //password
  const navigation = useNavigation(); //navigation between screens
  let buttonOpacity = new Value(1);
  //when login opens begin animation
  const onStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 500,
        easing: EasingNode.in,
      }).start();
    }
  };
  //animation start when x is pressed
  function onCloseState() {
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 400,
      easing: EasingNode.in,
    }).start();
  }
  //function for when login with microsoft button is pressed

  function OpenMicrosoft() {
    navigation.navigate("LoginMicrosoft");
  }

  const buttonY = buttonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const bgY = buttonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 3 - 20, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputZindex = buttonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputY = buttonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });
  const TextInputOpacity = buttonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const rotateCross = buttonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ["-360deg", "360deg"],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View
      style={{
        backgroundColor: "rgb(20, 41, 79)",
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Image
        style={{
          backgroundColor: "rgba(255,255,255,0)",
          top: 70,
          left: 60,
          height: 300,
          width: 320,
          position: "absolute",
          resizeMode: "cover",
          zIndex: 1,
        }}
        source={require("./images/wits5.png")}
      />

      <Animated.View
        style={{ position: "absolute", transform: [{ translateY: bgY }] }}
      >
        <Image
          source={require("./images/backgroundLogin2.png")}
          style={{
            resizeMode: "contain",
            width: width + 200,
            height: height + 100,
            left: -100,
            top: 32,
          }}
        />
      </Animated.View>
      <View style={{ height: height / 3, justifyContent: "center" }}>
        <GestureHandlerRootView>
          <TapGestureHandler
            onHandlerStateChange={onStateChange}
            numberOfTaps={1}
            style={{ flex: 1 }}
          >
            <Animated.View
              style={{
                ...styles.button,
                opacity: buttonOpacity,
                backgroundColor: "rgba(255,255,255,0.9)",
                transform: [{ translateY: buttonY }],
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
        </GestureHandlerRootView>
        <GestureHandlerRootView>
          <TapGestureHandler
            onHandlerStateChange={OpenMicrosoft}
            numberOfTaps={1}
            style={{ flex: 1 }}
          >
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: "rgba(0,0,0,0.5)",
                opacity: buttonOpacity,
                flexDirection: "row",
                transform: [{ translateY: buttonY }],
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomColor: "rgb(242, 80, 34)",
                  color: "white",
                  borderBottomWidth: 5,
                }}
              >
                Sign{" "}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomColor: "rgb(127, 186, 0)",
                  color: "white",
                  borderBottomWidth: 5,
                }}
              >
                in{" "}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomColor: "rgb(127, 186, 0)",
                  color: "white",
                  borderBottomWidth: 5,
                }}
              >
                wit
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomColor: "rgb(0, 164, 239)",
                  color: "white",
                  borderBottomWidth: 5,
                }}
              >
                h{" "}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomColor: "rgb(0, 164, 239)",
                  color: "white",
                  borderBottomWidth: 5,
                }}
              >
                Mic
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomColor: "rgb(255, 185, 0)",
                  color: "white",
                  borderBottomWidth: 5,
                }}
              >
                rosoft
              </Text>
            </Animated.View>
          </TapGestureHandler>
        </GestureHandlerRootView>
        <Animated.View
          style={{
            height: height / 3,
            ...StyleSheet.absoluteFill,
            top: null,
            justifyContent: "center",
            zIndex: textInputZindex,
            opacity: TextInputOpacity,
            transform: [{ translateY: textInputY }],
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              height: 40,
              width: 40,
              flex: 1,
              top: -10,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: width / 2 - 20,
            }}
            onPress={() => {
              onCloseState();
            }}
          >
            <Animated.View>
              <Animated.Text
                style={{ fontSize: 15, transform: [{ rotate: rotateCross }] }}
              >
                X
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter email"
            style={styles.textInput}
            placeholderTextColor="black"
            /*  onChangeText={(newText) => {
              onStateChange(newText)
              setEmail(newText);
            }} */
            onChangeText={(newText) => {
              setEmail(newText);
            }}
            value={email}
          />
          <TextInput
            placeholder="Enter password"
            secureTextEntry
            value={password}
            style={styles.textInput}
            placeholderTextColor="black"
            /*   onChangeText={(newText) => {
              
              setPassword(newText);
            }} */
            onChangeText={(newText) => {
              setPassword(newText);
            }}
          />
          <Animated.View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                //navigation.navigate("Dashboard");
                console.log(email.text);
                LoginFirebase(email, password, navigation);
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    height: 70,
    marginHorizontal: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    borderColor: "rgba(0,0,0,0.2)",
    marginVertical: 5,
    backgroundColor: "white",
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: width / 2 - 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
});
