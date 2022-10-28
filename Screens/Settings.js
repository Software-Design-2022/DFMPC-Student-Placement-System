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
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DialogInput from "react-native-dialog-input";
import "./global";
import { createTopBar } from "../HelperFunctions";
const { width, height } = Dimensions.get("screen");

const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 60;
const ICON_SIZE = 180;
const back = "<";

function changeProfilePhoto() {
  // change profile photo function
  alert("TODO: Replace this alert with DialogInput");
  console.log("Button approach works!!");
}
const changeTheme = () => {
  alert("TODO: Change color pallete for primary colors.");
  console.log("App Theme button pressed.");
};
function changeSuggestions() {}
const DATA = [
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f62",
  },
];
const Settings = () => {
  const navigation = useNavigation();
  const [name, SetName] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(authUserProfilePic);

  const changeProfilePhoto = () => {
    setDialogVisible(true);
    console.log("Profile Photo button pressed");
  };
  
  return (
    <View style={{flex:1,zIndex:1}}>
      {createTopBar(10, navigation)}
      <View style={{flex:1,top:-60}}>
        <View style={{flex:1,zIndex:1}}>
      <Image
        style={{
          width: ICON_SIZE / 0.7,
          height: ICON_SIZE / 0.7,
          position: "absolute",
          resizeMode: "cover",
          borderRadius: ICON_SIZE,
          top: 120,
          zIndex: 1,
          justifyContent: "center",
          left: width / 2 - ICON_SIZE / 0.7 / 2,
        }}
        source={{ uri: authUserProfilePic }}
      />
      </View>
      <View style={{flex:1}}>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          borderRadius: 8,
          marginBottom: SPACING,
          shadowColor: "rgba(0,0,0,1)",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          paddingTop: SPACING,
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      >
        <View style={{ width: "100%", flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                changeProfilePhoto();
              }}
              style={{backgroundColor:'rgba(0,0,0,0.3)',left:30,width:width-60,borderRadius:10,marginBottom:20,marginTop:20}}
            >
              <Text style={styles.buttonText}>Change Profile Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                changeTheme();
              }}
              style={{backgroundColor:'rgba(0,0,0,0.3)',left:30,width:width-60,borderRadius:10,marginBottom:20}}
            >
              <Text style={styles.buttonText}>Change App Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}
            style={{backgroundColor:'rgba(0,0,0,0.3)',left:30,width:width-60,borderRadius:10,marginBottom:20}}>
              <Text style={styles.buttonText}>Suggestions?</Text>
            </TouchableOpacity>
        </View>
        <View>
          <DialogInput
            isDialogVisible={dialogVisible}
            title={"Change Profile Photo"}
            message={"Please paste image link.\nLeave blank to reset."}
            hintInput={profilePic}
            submitInput={(inputText) => {
              console.log("Image link input is: " + inputText);
              const isHyperLink = new RegExp(
                "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
              );
              const isImageFile = new RegExp(
                "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$"
              );
              if (inputText == "" || typeof inputText === "undefined") {
                //Sets profile photo to default photo
                authUser.ref.update({ user_profile_photo: authUserProfilePic });
                authUserProfilePic = defaultProfilePic; //Update locally because update() doesn't update the snapshot
                setProfilePic(authUserProfilePic);
                setDialogVisible(false);
              } else if (inputText === profilePic) {
                alert("Please input a NEW image link.");
                console.log("Image link is identical to current link.");
              } else if (
                inputText.match(isHyperLink) &&
                inputText.match(isImageFile)
              ) {
                console.log("Valid input received: " + inputText);
                // Sets new profile photo URL to input then, updates global variable
                authUser.ref.update({ user_profile_photo: inputText });
                authUserProfilePic = inputText;
                setProfilePic(authUserProfilePic);
                //Doesn't update the snapshot though
                setDialogVisible(false);
              } else {
                console.log("Invalid link inserted: " + inputText);
                alert("Please enter a valid image link.");
              }
            }}
            closeDialog={() => {
              setDialogVisible(false);
            }}
          ></DialogInput>
        </View>
      </View>
        
      </View>
      </View>
        <Image
        style={{ position: "absolute", transform: [{ translateX: -15 }],zIndex:-1}}
          resizeMode="contain"
          source={require("./images/background9.png")}
          blurRadius={0}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(28,56,107,255)",
    zIndex: 1,
  },
  linearGradient: {
    height: AVATAR_SIZE,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: AVATAR_SIZE / 3,
    fontWeight: "700",
    textAlign: "center",
    color: " rgba(255,255,255,1)",
    backgroundColor: "transparent",
    height: AVATAR_SIZE,
    paddingTop: AVATAR_SIZE / 4,
  },
});

export default Settings;
