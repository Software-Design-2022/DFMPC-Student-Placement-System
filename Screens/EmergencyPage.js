import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  LogBox,
  TouchableOpacity,
  Easing, // used for animation, easing is the rate of change of a parameter over time
  Linking,
} from "react-native";
import "./global";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { createTopBar } from "../HelperFunctions";
import { Modal } from "react-native-paper";
import {
  schedulePushNotification,
  EventNotification,
} from "./SendNotification";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import qs from "qs";
import Animated from "react-native-reanimated";
import { Switch } from "react-native-paper";

const authname = authName;
const authlastName = authLastName;

async function sendEmail(to, subject, body, options = {}) {
  const { cc, bcc } = options;

  let url = `mailto:${to}`;

  const query = qs.stringify({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc,
  });

  if (query.length) {
    url += `?${query}`;
  }
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error("Provided URL can not be handled");
  }

  return Linking.openURL(url);
}

const msg = {
  // message to be sent to the user
  title: "Message", // (optional)
  body: "Emergency Message Has Been Sent", // (required)
  data: { data: "goes here" }, // (optional) any data that is sent is stored in the push notification
};
const sendToFirestore = (text, msg, location) => {
  // send message to firestore
  firebase // firebase
    .firestore() // firestore
    .collection("panic_button") // collection
    .add({
      // add
      Location: JSON.stringify(location), // new firestore geopoint with latitude and longitude means
      query: text, // query
      student_Number: "123456", // student number
      user_FirstName: authname, // user first name
      user_LastName: authlastName, // user last name
    })
    .then(() => {
      Alert.alert("Emergency Message Saved"); // alert
      schedulePushNotification(msg, "Emergency Page"); // send notification
      sendEmail(
        "2345106@students.wits.ac.za",
        "Testing",
        "Angela, this is sent from the app",
        { cc: "2345106@students.wits.ac.za; angelankosi0118@gmail.com; " }
      ).then(() => {
        Alert.alert("Your message was successfully sent!");
      });
    });
};

export default function EmergencyPage() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // emergency page
  const [text, setText] = useState(""); // text
  const navigation = useNavigation(); // navigation
  const [expoPushToken, setExpoPushToken] = useState(""); // expo push token
  const [notification, setNotification] = useState(false); // notification
  const notificationListener = useRef(); // notification listener
  const responseListener = useRef(); // response listener
  const modalVisible = false; // modal visible
  LogBox.ignoreLogs(["Setting a timer"]); // ignore logs
  const positionButton = useRef(new Animated.Value(0)).current; // position button
  const isOnRef = useRef(false); // used to check if the button is on or off

  const startAnimationToOff = () => {
    Animated.timing(positionButton, {
      toValue: 0,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const startAnimationToOn = () => {
    Animated.timing(positionButton, {
      toValue: 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const positionInterpolate = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const backgroundColorAnimation = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: ["#415A77", "#415A77"],
  });

  const initialOpacityOn = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const initialOpacityOff = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    // return
    <View style={styles.container}>
      <View
        //create background image
        style={{ position: "absolute" }}
      >
        <Image
          resizeMode="contain"
          source={require("./images/background.png")}
          blurRadius={0}
        />
      </View>
      <View
        //create top bar
        style={{ flex: 1 }}
      >
        {createTopBar(10, navigation)}
        <View style={{ height: 50 }}>
          <Text>Location</Text>
          <TouchableOpacity
            style={{ height: 30, width: 60 }}
            activeOpacity={0.9}
          >
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10, marginBottom: 20, top: 60 }}>
          <TextInput
            // user can type their emergency message
            style={styles.message}
            placeholder="Type emergency message here!" // placeholder
            onChangeText={(newText) => setText(newText)} // on change text
            defaultValue={text} // default value
          />
        </View>

        <View style={{ margin: 20, top: 60 }}>
          <Button
            title="Send Emergency message"
            color="#415A77"
            // when clicked data is send to firestore database
            onPress={() => {
              sendToFirestore(text, msg, isSwitchOn ? getLocationAsync() : ""),
                setText("");
            }} // on press
          />
        </View>
      </View>
    </View>
  );
}

async function getLocationAsync() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND); // ask for location permission
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({}); // get current location
  return location;
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(192,192,192,0.3)",
  },
  message: {
    marginTop: 50,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
    height: 200,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "white",
  },

  Button1: {
    backgroundColor: "rgba(221, 240, 255,0.2)",
  },

  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  MapStyle: {
    flex: 1,
    margin: 20,
    marginBottom: 90,

    justifyContent: "center",
  },
});
