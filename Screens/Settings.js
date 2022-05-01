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
} from "react-native";
import { Alert } from "react-native";

const Dashboard = () => {
  const navigation = useNavigation();
  const [name, SetName] = useState("");

  return (
    <>
      <View style={styles.button}>
        <Button
          title="Change Profile Photo"
          onPress={() => {
            Alert.alert("TODO:", "Update User' profile_photo url in Firebase.");
          }}
        ></Button>
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
});

export default Dashboard;
