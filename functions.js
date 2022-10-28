import { firebase } from "../firebase";

export const multiply = (a, b) => {
    return a * b;
  };
  
  export const makeLowerCase = (string) => {
    return string.toLowerCase();
  };
  
  //function to get current date data from device and returns it as a date string
  export function getCurrentDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
  
    return day + "-" + month + "-" + year;
  }

  //function to find differences between date to determine if date should be kept
export function difference(start)
{
  let date = new Date();
  let date2 = new Date(start);
  let diff = Math.ceil((date2 - date) / (1000 * 3600 * 24));
  return diff;
}

export const LoginFirebase = () => {
  var found = false;
  firebase
    .database()
    .ref("/users")
    .on("value", (snapshot) => {
      const key = snapshot.forEach(function (data) {
        const check_email = snapshot.child(data.key + "/email").val();

        const encrypted = snapshot.child(data.key + "/password_digest").val();
        if (check_email === email) {
          // compare entered email with current email on the snapshot

          found = true; // sets found to true when we have found a matching email int the database

          if (encrypted === password) {
            // compares entered password to the password for the corresponding user in the database
            setUserVariables(data); // so that we can keep track of who is logged in currenctly
            
            console.log(
              "User authenticated sucessfully! Storing variables..."
            );
            navigation.navigate("Dashboard");
          } else {
            showAlert(
              "Password Error",
              "Your email and password do not match"
            );
          }
        }
      });
      if (found === false) {
        showAlert("Email Error", "user does not exist");
      }
    });


    return found;
};
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


export const sendToFirestore = (text, msg) => {  // send message to firestore 
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

