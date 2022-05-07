import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Linking,
  Alert,
} from "react-native";
import firebase from "../firebase";
import "../global.js";
import { TouchableOpacity } from "react-native-web";
import DialogInput from "react-native-dialog-input";

const Settings = () => {
  const navigation = useNavigation();
  const [name, SetName] = useState("");
  const [visible, setVisible] = useState(false);

  const changeProfilePhoto = () => {
    setVisible(true);
    console.log("Dialog Button pressed. Dialog visible.");
  };

  return (
    <>
      <View style={styles.button}>
        <Image style={styles.ProfilePic} source={{ uri: authUserProfilePic }} />
      </View>
      <View style={styles.button}>
        <Button
          title="Change Profile Photo"
          onPress={changeProfilePhoto}
        ></Button>
        <DialogInput
          isDialogVisible={visible}
          title={"Change Profile Photo"}
          message={"Please paste image link.\nLeave blank to reset."}
          hintInput={authUserProfilePic}
          submitInput={(inputText) => {
            console.log("Image link input is: " + inputText);
            const isHyperLink = new RegExp(
              "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
            );
            const isImageFile = new RegExp(
              "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$"
            );
            if (inputText == "") {
              //Sets profile photo to default photo
              authUser.ref.update({ user_profile_photo: defaultProfilePic });
              authUserProfilePic = defaultProfilePic; //Update locally because update() doesn't update the snapshot
              setVisible(false);
            } else if (
              inputText.match(isHyperLink) &&
              inputText.match(isImageFile)
            ) {
              console.log("Valid input received: " + inputText);
              // Sets new profile photo URL to input then, updates global variable
              authUser.ref.update({ user_profile_photo: inputText });
              authUserProfilePic = inputText;
              //Doesn't update the snapshot though
              setVisible(false);
            } else {
              console.log("Invalid link inserted: " + inputText);
              alert("Please enter a valid image link.");
            }
          }}
          closeDialog={() => {
            setVisible(false);
          }}
        ></DialogInput>
      </View>
      <View style={styles.button}>
        <Button
          title="Change App Theme"
          onPress={() => {
            Alert.alert(
              "TODO:",
              "Display app theme options as dropdown. \nPlace current theme on the top."
            );
          }}
        ></Button>
      </View>
      <View style={styles.button}>
        <Button
          title="Suggestions?"
          onPress={() => {
            Alert.alert(
              "TODO:",
              "Add suggestions, placeholder. \nAdd suggestions on Discord."
            );
          }}
        ></Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "darkcyan",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  tinyProfilePic: {
    width: 45,
    height: 45,
    borderRadius: 50,
    margin: 5,
  },
  ProfilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 5,
    marginBottom: 10,
  },
  btnStyle: {
    width: "30%",
    backgroundColor: "white",
    marginTop: 50,
    borderColor: "lightblue",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
