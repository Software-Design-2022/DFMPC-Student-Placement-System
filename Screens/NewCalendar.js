import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Provider } from "react-native-paper";
import { firebase } from "../firebase";
import { getCurrentDate } from "../HelperFunctions";
import BottomSheet from "./BottomSheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Card, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import "../global";
const { width, height } = Dimensions.get("screen");
const SPACING = 20;
const ICON_SIZE = 75;
const initialDate = getCurrentDate();

const compare = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

async function eventsData(onReceiveList) {
  const events = [];
  var snapshot = await firebase
    .firestore()
    .collection("events")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        let start = doc.data().start_date,
          end = doc.data().end_date,
          name = doc.data().name,
          id = doc.data().id,
          programme = doc.data().programme,
          key = events.length + 1;
        let date = new Date();
        let date2 = new Date(start);
        let diff = Math.ceil((date2 - date) / (1000 * 3600 * 24));
        if (Math.abs(diff) < 90) {
          events.push({
            name: name,
            key: key,
            start: start,
            end: end,
            id: id,
            programme: programme,
          });
        }
      });
    });

  onReceiveList(events);
}

async function sendToFirestore(state) {
  await firebase
    .firestore()
    .collection("events")
    .add({
      name: state.eventtext,
      start_date: state.startdatetext,
      end_date: state.enddatetext,
      id: Math.max(50, Math.floor(Math.random() * 150)),
      programme: state.notetext,
    })
    .then(() => {
      Alert.alert("Event Added");
    });
}

const NewCalendar = () => {
  const [EventsState, SetEventsState] = useState({
    events: [
      {
        key: 0,
        programme: "",
        name: "",
        id: 0,
        start: "",
        end: "",
      },
    ],
  });

  const onReceive = (newEvents) => {
    // when the list is received we set our protocolLIst to the current received list (updating)
    SetEventsState((prevState) => ({
      events: (prevState.events = newEvents),
    }));
  };
  eventsData(onReceive);

  const [shouldShow, setShouldShow] = useState(false);
  const [dayData, setDayData] = useState([{}]);

  const GetMarkedDates = () => {
    let markedDay = {};
    EventsState.events.map((item, key) => {
      markedDay[item.start] = {
        selected: false,
        marked: true,
        selectedColor: "blue",
      };
    });
    return markedDay;
  };

  const getDayEvents = (day) => {
    const data = [];
    EventsState.events.map((event, key) => {
      if (compare(event.start, day.dateString) == true) {
        data.push(event);
      }
    });
    setDayData(data);
  };
  const [state, setState] = useState({
    modalVisible: false,
    startdatetext: "",
    enddatetext: "",
    eventtext: "",
    notetext: "",
    datePickerVisible: false,
    selectedDate: new Date(),
    btnstart: false,
    btnend: false,
  });

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setState({
            modalVisible: false,
          });
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              top: 50,
              height: 400,
              width: width / 1.2,
              backgroundColor: "white",
              borderRadius: 10,
              borderWidth: 4,
            }}
          >
            <Text style={{ fontSize: 25, top: 10, textAlign: "center" }}>
              Create Event
            </Text>
            <View style={{ padding: 10, marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                Event name
              </Text>
              <TextInput
                // user can type their emergency message
                style={styles.message}
                placeholder="Enter name"
                onChangeText={(newText) => setState({ eventtext: newText })}
                defaultValue={""}
              />
            </View>
            <View>
              <Pressable
                style={[
                  styles.buttonClose,
                  {
                    borderRadius: 10,
                    padding: 10,
                    elevation: 2,
                    height: 50,
                    width: 200,
                    left: 20,
                    bottom: 10,
                    backgroundColor: "rgba(28,56,107,1)",
                  },
                  { width: 200, left: 10 },
                ]}
                onPress={() =>
                  setState({
                    datePickerVisible: true,
                    btnstart: true,
                    btnend: false,
                  })
                }
              >
                <Text style={[styles.textStyle]}>Select a start date</Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                style={[
                  styles.buttonClose,
                  {
                    borderRadius: 10,
                    padding: 10,
                    elevation: 2,
                    height: 50,
                    width: 200,
                    left: 20,
                    bottom: 10,
                    backgroundColor: "rgba(28,56,107,1)",
                  },
                  { width: 200, left: 10 },
                ]}
                onPress={() =>
                  setState({
                    datePickerVisible: true,
                    btnstart: false,
                    btnend: true,
                  })
                }
              >
                <Text style={[styles.textStyle]}>Select an end date</Text>
              </Pressable>
            </View>
            <View
              style={{
                padding: 20,
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DateTimePickerModal
                date={state.selectedDate}
                isVisible={state.datePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  setState({
                    selectedDate: date,
                    datePickerVisible: false,
                  });
                  if (state.btnstart === true) {
                    let datestr = state.selectedDate
                      .toISOString()
                      .split("T")[0];
                    setState({
                      startdatetext: datestr,
                    });
                  } else if (state.btnend === true) {
                    let datestr = state.selectedDate
                      .toISOString()
                      .split("T")[0];
                    setState({
                      enddatetext: datestr,
                    });
                  }
                }}
                onCancel={() => {
                  setState({ datePickerVisible: false });
                }}
              />
            </View>
            <View style={{ padding: 10, marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>End date</Text>
              <TextInput
                // user can type their emergency message
                style={styles.message}
                placeholder="YYYY-MM-DD"
                onChangeText={(newText) => setState({ enddatetext: newText })}
                defaultValue={state.text}
              />
            </View>
            <View style={{ padding: 10, marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>Notes</Text>
              <TextInput
                // user can type their emergency message
                style={styles.message}
                placeholder="Type notes here"
                onChangeText={(newText) => setState({ notetext: newText })}
                defaultValue={state.text}
              />
            </View>
            <View style={{ flexDirection: "row", left: 20, top: 42 }}>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { width: width / 3, left: 10, bottom: 30 },
                ]}
                onPress={() =>
                  setState({
                    modalVisible: false,
                  })
                }
              >
                <Text style={[styles.textStyle]}>Done</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  {
                    width: width / 3,
                    left: 20,
                    bottom: 30,
                    backgroundColor: "rgba(28,56,107,1)",
                  },
                ]}
                onPress={() => sendToFirestore(state)}
              >
                <Text style={[styles.textStyle]}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <TouchableOpacity
          onPress={() =>
            setState({
              modalVisible: true,
            })
          }
          style={{
            backgroundColor: "rgba(28,56,107,0.0)",
            position: "absolute",
            borderRadius: 50,
            width: 50,
            height: 50,
            zIndex: 1,
            right: 20,
            top: height - 250,
            alignItems: "center",
          }}
        >
          <AntDesign name="pluscircle" color="black" size={50} />
        </TouchableOpacity>
      </View>
      <Calendar
        style={{ margin: 30 }}
        markedDates={GetMarkedDates()}
        onDayPress={(day) => {
          getDayEvents(day);
          eventData = dayData;
          if (showEvent == false) {
            showEvent = true;
          }
        }}
        onDayLongPress={(day) => {
          setState({
            modalVisible: true,
          })
        }}
      />
      <Provider>
        <View>
          <BottomSheet></BottomSheet>
        </View>
      </Provider>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  eventStyle: {
    justifyContent: "flex-end",
    marginBottom: 36,
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: "green",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width / 2,
    height: height / 3,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    bottom: -height / 5,
  },
  buttonClose: {
    backgroundColor: "black",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default NewCalendar;
