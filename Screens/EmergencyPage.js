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
      Location: [-latitude, longitude],
      query: text,
      student_Number: "123456",
      user_FirstName: authname,
      user_LastName: authlastName,
    })
    .then(() => {
      Alert.alert("Emergency Message Saved");
      schedulePushNotification(msg);
      let today = new Date();
      let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
      let minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
      let seconds = (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
      notificationList.push({
        id: 10,
        heading: "Emergency Page",
        time: hours + ":" + minutes + ":" + seconds,
        date:
          today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear(),
        day: " ",
        body:
          "You sent an emergency message at " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds,
      });
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
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const modalVisible = false;
  useEffect(() => {
    let cancel = false;
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({
            modalVisible: false,
          });
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              top: 50,
              height: 400,
              width: width / 1.2,
              backgroundColor: "white",
              borderRadius: 10,
              borderWidth: 4,
            }}
          >
            <View style={{ flexDirection: "row", left: 20, top: 42 }}>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { width: width / 3, left: 10, bottom: 30 },
                ]}
                onPress={() =>
                  this.setState({
                    modalVisible: false,
                  })
                }
              >
                <Text style={[styles.textStyle]}>Done</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  {
                    width: width / 3,
                    left: 20,
                    bottom: 30,
                    backgroundColor: "rgba(28,56,107,1)",
                  },
                ]}
                onPress={() => sendToFirestore(this.state)}
              >
                <Text style={[styles.textStyle]}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ position: "absolute" }}>
        <Image
          resizeMode="contain"
          source={require("./images/background.png")}
          blurRadius={0}
        />
      </View>
      <View style={{ flex: 1 }}>
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
            onPress={() => sendToFirestore(text, msg)}
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
