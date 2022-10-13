import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import "./global";
import { firebase } from "../firebase";

const SendNotification = () => {
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
};

const sentData = (msg, fromPage) => {
  let today = new Date();
  let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
  let minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
  let seconds = (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();

  firebase
    .firestore()
    .collection("notifications")
    .add({
      id: notificationId,
      userID: authUserID,
      userName: authUserID,
      heading: fromPage,
      message: msg,
      time: hours + ":" + minutes + ":" + seconds,
      date: today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear(),
      day: " ",
      body: "notification sent at " + hours + ":" + minutes + ":" + seconds,
    });
  notificationId = notificationId + 1;
  //console.log(notificationId)
};

//send events notifications

export async function EventNotification() {
  const events = [];
  const snapshot = await firebase
    .firestore()
    .collection("events")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        let start = doc.data().start_date,
          end = doc.data().end_date,
          name = doc.data().name,
          id = doc.data().id,
          programme = doc.data().programme,
          key = events.length + 1;
        let date = new Date();
        let date2 = new Date(start);
        let diff = Math.ceil((date2 - date) / (1000 * 3600 * 24));
        if (Math.abs(diff) < 90) {
          events.push({
            name: name,
            key: key,
            start: start,
            end: end,
            id: id,
            programme: programme,
          });
        }
      });
    });

  // check if start date - today is ==1 then event is tomorrow
  //console.log(events);

  events.map((event, key) => {
    const date1 = new Date(event.start);
    const date2 = new Date();

    const timeLeft = date1.getTime() - date2.getTime();
    const daysLeft = timeLeft / (1000 * 3600 * 24);
    // console.log(date1)
  //  console.log(Math.floor(daysLeft));
    if (Math.floor(daysLeft) >= 0) {
      if (Math.floor(daysLeft) == 1) {
        const msg = {
          title: "Event",
          body: event.programme + " event tomorrow",
          data: { data: "goes here" },
        };
        schedulePushNotification(msg, "Event");
      }

      if (Math.floor(daysLeft) == 0) {
        const msg = {
          title: "Event",
          body: event.programme + " event today",
          data: { data: "goes here" },
        };
        schedulePushNotification(msg, "Event");
      }
    }
  });
}

export async function schedulePushNotification(msg, fromPage) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: msg.title,
      body: msg.body,
      data: msg.data,
    },
    trigger: { seconds: 1 },
  });
  sentData(msg, fromPage);
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
