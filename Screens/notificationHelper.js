import { firebase } from "../firebase";

import { v4 as uuidv4 } from "uuid"; // Generate random UUID

export async function getList(onReceiveList) {
  // Get list of all items in the database
  var notifications = []; // Create empty array to store all items in database

  var snapshot = await firebase
    .firestore()
    .collection("notifications")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        // For each item in collection
        notifications.push({
          // Add item to array
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
  notifications
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .sort((a, b) => (a.time < b.time ? 1 : -1));
  onReceiveList(notifications); // Send array to function that called this function
}
