import { firebase } from "../firebase";
import "./global";

export async function setDoctorsList() {
  var doctors = [];
  var snapshot = await firebase
    .firestore()
    .collection("doctors")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        doctors.push({
          name: doc.data().name,
          email: doc.data().email,
          id: doc.data().id,
          photo: doc.data().photo,
        });
      });
    });

  doctorsList = doctors;
}

export async function setNotificationList() {
  var notification = [];
  var snapshot = await firebase
    .firestore()
    .collection("notifications")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        notification.push({
          key: doc.data().id,
          userID: doc.data().userID,
          userName: doc.data().userName,
          heading: doc.data().heading,
          message: doc.data().message,
          time: doc.data().time,
          date: doc.data().date,
          day: doc.data().day,
          body: doc.data().body,
        });
      });
    });

  notificationList = notification;
}

// get notifications upon login
