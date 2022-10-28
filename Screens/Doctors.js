import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import { Rating } from "react-native-elements";
import { firebase } from "../firebase";
import "./global";
import { useNavigation } from "@react-navigation/core";
import { createTopBar } from "../HelperFunctions";

/**
 * Send the rating to the firebase database.
 * @param {number} feedback - The feedback given by the user
 * @param {number} rating - The rating given by the user
 * @param {string} DoctorName - The name of the doctor
 * @param {string} email - The email of the doctor
 */
const sendData = (feedback, rating, DoctorName, email) => {
  firebase
    .firestore()
    .collection("feedback")
    .add({
      feedback: feedback,
      rating: rating,
      studentID: authUserID,
      sentBy: authName + " " + authLastName,
      doctorName: DoctorName,
      doctorEmail: email,
    });
};

const { height } = Dimensions.get("window");

/**
 * @module Feedback
 * @returns Screen that displays the feedback form for the user to fill in about the doctor
 */
export const Doctors = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  /**
   * A react hook to set the search data to the value of the search bar
   */
  const [searchData, setSearchData] = useState(doctorsList);
  /**
   * A react hook to set the modal to visible or not
   */
  const [modalVisible, setModalVisible] = useState(false);
  /**
   * A react hook to set the button text for the doctor name
   */
  const [doctor, setDoctor] = useState([]);
  /**
   * A react hook that sets the rating of the doctor
   */
  const [feedback, setFeedback] = useState("");
  /**
   *  A react hook that sets the rating of the doctor
   */
  const [DoctorRating, setRating] = useState(0);

  LogBox.ignoreLogs(["Setting a timer"]);
  /**
   * A function that filters the doctors list based on the search bar input
   * @param {Object} item
   * @returns {Object} - The filtered list of doctors
   */
  function Item({ item }) {
    return (
      <View>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            setDoctor(item);
            setModalVisible(true);
          }}
        >
          <Image
            source={{ uri: item.photo }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text style={{ fontWeight: "bold" }}>{item.email}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  /**
   * A function that sets the rating of the doctor
   * @param {number} rating
   */
  const ratingCompleted = (rating) => {
    setRating(rating);
  };
  /**
   * Function that filters the doctors list based on the search bar input
   * @param {string} text
   */
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = doctorsList.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchData(newData);
      setSearch(text);
    } else {
      setSearchData(doctorsList);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      {createTopBar(10, navigation)}
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search For Doctor"
      />
      <FlatList
        style={{ flex: 1 }}
        data={searchData}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.email}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{ uri: doctor.photo }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <Text style={styles.modalText}>{doctor.name}</Text>
            <Text style={styles.modalText}>{doctor.email}</Text>

            <TextInput
              style={styles.feedback}
              label="feedback"
              mode="outlined"
              value={feedback}
              onChangeText={(text) => setFeedback(text)}
            />

            <Rating
              showRating
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <View style={{ flexDirection: "row", margin: 50 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  sendData(feedback, DoctorRating, doctor.name, doctor.email);
                  Alert.alert("Alert", "feedback has been sent");
                }}
              >
                <Text style={styles.textStyle}>SEND FEEDBACK</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>CLOSE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/**
 * Stylesheet for the Feedback screen
 * @constant {StyleSheet} styles - Stylesheet for the Feedback screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30,81,123,1)",
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height - 30,
    width: 400,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 50,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },
  feedback: {
    marginTop: 50,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
    height: 200,
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "blue",
  },
});
