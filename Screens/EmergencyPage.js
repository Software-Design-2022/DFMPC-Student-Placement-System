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
import "../global";
import { Location, Permissions } from "expo"; // Location and Permissions are expo modules
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const authname = authName;
const authlastName = authLastName;
const latitude = 20;
const longitude = 30;

const msg = {
  title: "Message",
  body: "Emergency Message Has Been Sent",
  data: { data: "goes here" },
};

const sendToFirestore = (text, msg) => {
  firebase
    .firestore()
    .collection("panic_button")
    .add({
      Location: new firebase.firestore.GeoPoint(latitude, longitude), // new firestore geopoint with latitude and longitude means
      query: text,
      student_Number: "123456",
      user_FirstName: authname,
      user_LastName: authlastName,
    })
    .then(() => {
      Alert.alert("Emergency Message Saved");
      schedulePushNotification(msg);
    });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function EmergencyPage() {
  // inside this function we will use the location module to get the location of the user and then send it to the database
  const [setLocation] = useState(null);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // this function will get the location of the user
  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  // to use getLocation function we need to call it inside useEffect function so that it will be called only once when the page is loaded

  useEffect(() => {
    let cancel = false;

    // call the getLocation function
    getLocation(); // call getLocation function to get the location of the user

    registerForPushNotificationsAsync().then((token) => {
      if (cancel) return;
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      cancel = true;
    };
  }, []);
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            top: -50,
            backgroundColor: "rgba(255,255,255,0.8)",
            height: 100,
            zIndex: 1,
            borderEndWidth: 0,
            borderEndColor: "rgba(255,255,255,1)",
            borderBottomStartRadius: 100,
          }}
        >
          <View style={{ margin: 0 }}>
            <Image
              style={{ height: 80, position: "absolute", top: 5, left: -160 }}
              resizeMode="contain"
              source={require("./images/wits.png")}
              blurRadius={0}
            />
          </View>
        </View>

        <View style={{ padding: 10, marginBottom: 20 }}>
          <TextInput
            // user can type their emergency message
            style={styles.message}
            placeholder="Type emergency message here!"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
        </View>

        <View style={styles.Button1}>
          <Button
            title="Submit"
            color="#729fd4"
            // when clicked data is send to firestore database and reset text input
            onPress={() => {
              sendToFirestore(text, msg);
              // clear text input after submit
              setText("");
            }}
          />
        </View>
      </View>
    </View>
  );
}

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
  let token; // expo token
  if (Device.isDevice) {
    // if device is a real device
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync(); // get permission
    let finalStatus = existingStatus; // set final status
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync(); // request permission
      finalStatus = status; // set final status
    }
    if (finalStatus !== "granted") {
      // if permission is not granted
      alert("Failed to get push token for push notification!"); // alert user
      return; // return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data; // get token
  }

  if (Platform.OS === "android") {
    // if device is android
    await Notifications.setNotificationChannelAsync("default", {
      // set notification channel
      name: "default", // name of channel
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

/* borderColor: "rgba(192,192,192,0.3)",
backgroundColor: "rgba(192,192,192,0.2)",
backgroundColor: "rgba(63, 130, 109,0.2)",
 backgroundColor: "rgba(181, 177, 178,0.2)",
 backgroundColor: "rgb(216, 212, 213)",
  backgroundColor: "rgba(221, 240, 255,0.2)",
 */

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
    backgroundColor: "#32455c",
  },

  Button1: {
    backgroundColor: "#050c12",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
    width: 300,
    marginLeft: 60,
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
