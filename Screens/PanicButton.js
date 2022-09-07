import React, { useState } from "react";
import {
  requireNativeComponent,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  Platform,
  useEffect,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import "../global";
import { firebase } from "../firebase";
const Separator = () => <View style={styles.separator} />;

// this function will receive the text currently entered
// it will the send it to the database
// saves location amd user info
const sendToFirestore = (text) => {
  firebase
    .firestore()
    .collection("panic_button")
    .add({
      Location: [-latitude, longitude],
      query: text,
      student_Number: "123456",
      user_FirstName: authname,
      user_LastName: authlastName,
    })
    .then(() => {
      Alert.alert("Emergency Message Saved");
    });
};
const authname = authName;
const authlastName = authLastName;
const latitude = 20;
const longitude = 30;
const PanicButton = () => {
  const [text, setText] = useState("");
  const [position, setPosition] = useState(null);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "center", marginBottom: 30 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#f194ff",
            textAlign: "center",
          }}
        >
          Emergency Button Page
        </Text>
      </View>
      <Separator />
      <View style={{ marginBottom: 20 }}>
        <Button
          // when clicked it will navigate to the Protocols page
          // where user can have a look at the available protocols
          title="Protocols"
          onPress={() => navigation.navigate("Protocols")}
        />
      </View>
      <Separator />

      <View style={{ padding: 10, marginBottom: 20 }}>
        <TextInput
          // user can type their emergency message
          style={{
            height: 90,
            textAlign: "center",
            backgroundColor: "lightblue",
          }}
          placeholder="Type emergency message here!"
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
      </View>
      <Separator />
      <View style={{ marginBottom: 20, zIndex: 1 }}>
        <Button
          title="Send Emergency message"
          color="#f194ff"
          // when clicked data is send to firestore database
          onPress={() => sendToFirestore(text)}
        />
      </View>
      <Separator />
      <View>{/* <Text>Display Current Location of device</Text> */}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  MapStyle: {
    flex: 1,
    margin: 20,
    marginBottom: 90,

    justifyContent: "center",
  },
});

export default PanicButton;
