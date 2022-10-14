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
} from "react-native";
import "./global";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { createTopBar } from "../HelperFunctions";
import { Modal } from "react-native-paper";
import {schedulePushNotification,EventNotification} from "./SendNotification"
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const authname = authName;
const authlastName = authLastName;
const latitude = 20;
const longitude = 30;

const msg = { // message to be sent to the user 
  title: "Message", // (optional) 
  body: "Emergency Message Has Been Sent",  // (required) 
  data: { data: "goes here" }, // (optional) any data that is sent is stored in the push notification 
};
const sendToFirestore = (text, msg) => {  // send message to firestore 
  firebase // firebase 
    .firestore() // firestore 
    .collection("panic_button") // collection 
    .add({ // add 
      Location: JSON.stringify(location), // new firestore geopoint with latitude and longitude means
      query: text, // query 
      student_Number: "123456", // student number 
      user_FirstName: authname, // user first name 
      user_LastName: authlastName, // user last name 
    })
    .then(() => {
      Alert.alert("Emergency Message Saved"); // alert 
      schedulePushNotification(msg,"Emergency Page"); // send notification 
      

    });
};


export default function EmergencyPage() { // emergency page 
  const [text, setText] = useState(""); // text 
  const navigation = useNavigation(); // navigation 
  const [expoPushToken, setExpoPushToken] = useState(""); // expo push token 
  const [notification, setNotification] = useState(false);  // notification 
  const notificationListener = useRef(); // notification listener
  const responseListener = useRef(); // response listener 
  const modalVisible = false; // modal visible
  //  useEffect(() => {
  //   let cancel = false;
  //   registerForPushNotificationsAsync().then((token) => {
  //     if (cancel) return;
  //     setExpoPushToken(token);
  //   });

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //     cancel = true;
  //   };
  // }, []); 
  LogBox.ignoreLogs(["Setting a timer"]); // ignore logs 

  return (  // return 
    <View style={styles.container}> // view 
      
      <View style={{ position: "absolute" }}> // view 
        <Image // image 
          resizeMode="contain" // resize mode 
          source={require("./images/background.png")} // source 
          blurRadius={0} // blur radius 
        />
      </View>
      <View style={{ flex: 1 }}> // view 
        {createTopBar(10, navigation)} // create top bar 

        <View style={{ padding: 10, marginBottom: 20, top: 60 }}> // view 
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
            onPress={() => {sendToFirestore(text, msg),setText("");}} // on press  
          />
        </View>
      </View>
    </View>
  );
}

async function getLocationAsync() 
{
  let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND); // ask for location permission
  if (status !== "granted") 
  {
    setErrorMsg("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({}); // get current location
  return location;
  
}

const location = getLocationAsync(); // call getLocationAsync function and store the result in location variable
/* 
async function schedulePushNotification(msg) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: msg.title,
      body: msg.body,
      data: msg.data,
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
} */

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
