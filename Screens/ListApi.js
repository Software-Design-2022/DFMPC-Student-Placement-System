import { firebase } from "../firebase";

import { v4 as uuidv4 } from "uuid"; // Generate random UUID

export async function getList(onReceiveList) { // Get list of all items in the database
  var protocols = []; // Create empty array to store all items in database

  var snapshot = await firebase // Get all items in database
    .firestore()
    .collection("emergency_protocols") // Get collection of protocols
    .get() // Get all items in collection
    .then((querySnapshot) => { // For each item in collection
      querySnapshot.forEach(function (doc) { // For each item in collection
        protocols.push({ // Add item to array
          key: protocols.length + 1, // Add key to item
          Protocol: doc.id, // Add item to array
          content: doc.data().protocol_1.split("~").join("\n"), // Format item using split and join
        });
      });
    });

  onReceiveList(protocols); // Send array to function that called this function
}
