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
} from "react-native";
import "../global";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const Separator = () => <View style={styles.separator} />;

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
    });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function PanicButton() {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
 
  useEffect(() => {
    let cancel=false
    registerForPushNotificationsAsync().then((token) =>{
      if(cancel) return
      setExpoPushToken(token)
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
      
    
        
        <View style={{ margin:20 }}>
          <Button
            
            title="Send Emergency message"
            color="#415A77"
            // when clicked data is send to firestore database
            onPress={() => sendToFirestore(text, msg)}
          />
        </View>
        <View style={{ margin:20 }}>
          <Button
            // when clicked it will navigate to the Protocols page
            // where user can have a look at the available protocols
            
            color="#778DA9"
            title="Protocols"
            onPress={() => navigation.navigate("Protocols")}
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
    borderRadius:5,
    backgroundColor: "white",
  },

  Button1:{
    backgroundColor:"rgba(221, 240, 255,0.2)"
  },

  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
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
