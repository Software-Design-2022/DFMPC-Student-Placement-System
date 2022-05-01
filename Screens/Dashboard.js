import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Linking,
} from "react-native";
import "../global.js";

const Dashboard = () => {
  const navigation = useNavigation();
  const [name, SetName] = useState("");
  console.log("Active user is " + authUserID);
  return (
    <>
      <View style={styles.button}>
        <Button
          title="Schedule"
          onPress={() => {
            navigation.navigate("Schedule");
          }}
        ></Button>
      </View>
      <View style={styles.button}>
        <Button
          title="Logout"
          onPress={() => {
            navigation.navigate("Login");
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
