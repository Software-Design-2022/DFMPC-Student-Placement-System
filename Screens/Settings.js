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
} from "react-native";
import { Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DialogInput from "react-native-dialog-input";
import "../global";

const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 60;
const ICON_SIZE = 180;

function changeProfilePhoto() {
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
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Change Profile Photo',
    text: "TODO:, Update User' profile_photo url in Firebase.",
    
  },
  {
    id: '2',
    title: 'Change App Theme',
    text: "TODO:, Update User' profile_photo url in Firebase.",
  },
  {
    id: '3',
    title: 'Suggestions?',
    text: "TODO:, Update User' profile_photo url in Firebase.",
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

  const renderItem = ({ item }) => {
    return (
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
          <LinearGradient
            colors={[
              "rgba(30,55,108,1)",
              " rgba(30,55,108,0.8)",
              "rgba(30,55,108,1)",
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                changeProfilePhoto();
              }}
            >
              <Text style={styles.buttonText}>Change Profile Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                changeTheme();
              }}
            >
              <Text style={styles.buttonText}>Change App Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.buttonText}>Suggestions?</Text>
            </TouchableOpacity>
          </LinearGradient>
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
                authUser.ref.update({ user_profile_photo: defaultProfilePic });
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
    );
  };
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          resizeMode: "cover",
          right: 0,
          top: 10,
          borderRadius: ICON_SIZE,
          marginRight: SPACING / 2,
          borderWidth: 10,
          borderColor: "rgba(200,200,200,1)",
          backgroundColor: "white",
          shadowOffset: {
            height: 10,
            shadowColor: "black",
            flex: 1,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
        source={{ uri: profilePic }}
      />
      <View
        style={{
          flex: 2,
          marginTop: 25,
          width: "100%",
          backgroundColor: "rgba(30,55,108,1)",
        }}
      >
        <FlatList
          contentContainerStyle={{}}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(28,56,107,255)",
    width: "100%",
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
    color: " rgba(128,163,198,0.8)",
    backgroundColor: "transparent",
    height: AVATAR_SIZE,
    paddingTop: AVATAR_SIZE / 4,
  },
});

export default Settings;
