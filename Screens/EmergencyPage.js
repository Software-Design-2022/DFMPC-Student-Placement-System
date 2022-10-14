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

//message to be sent to database
const msg = {
  title: "Message",
  body: "Emergency Message Has Been Sent",
  data: { data: "goes here" },
};

//function to send message to database
const sendToFirestore = (text, msg) => {
  firebase
    .firestore()
    .collection("panic_button")
    //user data about individual message
    .add({
      Location: JSON.stringify(location), // new firestore geopoint with latitude and longitude means
      query: text,
      student_Number: "123456",
      user_FirstName: authname,
      user_LastName: authlastName,
    })
    .then(() => {
      Alert.alert("Emergency Message Saved");
      schedulePushNotification(msg,"Emergency Page");
      

    });
};


export default function EmergencyPage() {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  LogBox.ignoreLogs(["Setting a timer"]);
  //view for emergency page with textbox and button
  return (
    <View style={styles.container}>
      
      <View 
      //create background image
      style={{ position: "absolute" }}>
        <Image
          resizeMode="contain"
          source={require("./images/background.png")}
          blurRadius={0}
        />
      </View>
      <View 
      //create top bar
      style={{ flex: 1 }}>
        {createTopBar(10, navigation)}

        <View style={{ padding: 10, marginBottom: 20, top: 60 }}>
          <TextInput
            // user can type their emergency message
            style={styles.message}
            placeholder="Type emergency message here!"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
        </View>

        <View style={{ margin: 20, top: 60 }}>
          <Button
            title="Send Emergency message"
            color="#415A77"
            // when clicked data is send to firestore database
            onPress={() => {sendToFirestore(text, msg),setText("");}}
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
