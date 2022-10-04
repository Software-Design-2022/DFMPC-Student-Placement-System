import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import React, { useState, PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  LogBox,
  Modal,
  TouchableHighlight,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { Card, Avatar } from "react-native-paper";
import { firebase, db } from "../firebase";
import { getCurrentDate } from "../HelperFunctions";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
//import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { createTopBar } from "../HelperFunctions";


const data = [];
const { width, height } = Dimensions.get("screen");
const SPACING = 20;
const ICON_SIZE = 75;
const initialDate = getCurrentDate();


const compare = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

//send event data to database
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

// function to retrieve events from firestore
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

LogBox.ignoreLogs(["Setting a timer"]);
export default class EventsCalendar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      events: [],
      modalVisible: false,
      startdatetext: "",
      enddatetext: "",
      eventtext: "",
      notetext: "",
    };
  }
  render() {
    return (
      <View style={{ flex: 1, top:SPACING*2,backgroundColor:'white'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({
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
                  onChangeText={(newText) =>
                    this.setState({ eventtext: newText })
                  }
                  defaultValue={this.state.text}
                />
              </View>
              <View style={{ padding: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Start date
                </Text>
                <TextInput
                  // user can type their emergency message
                  style={styles.message}
                  placeholder="YYYY-MM-DD"
                  onChangeText={(newText) =>
                    this.setState({ startdatetext: newText })
                  }
                  defaultValue={this.state.text}
                />
              </View>
              <View style={{ padding: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  End date
                </Text>
                <TextInput
                  // user can type their emergency message
                  style={styles.message}
                  placeholder="YYYY-MM-DD"
                  onChangeText={(newText) =>
                    this.setState({ enddatetext: newText })
                  }
                  defaultValue={this.state.text}
                />
              </View>
              <View style={{ padding: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Notes</Text>
                <TextInput
                  // user can type their emergency message
                  style={styles.message}
                  placeholder="Type notes here"
                  onChangeText={(newText) =>
                    this.setState({ notetext: newText })
                  }
                  defaultValue={this.state.text}
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
                    this.setState({
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
                  onPress={() => sendToFirestore(this.state)}
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
              this.setState({
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
              top: height - 175,
              alignItems: "center",
            }}
          >
            <AntDesign name="pluscircle" color="black" size={50} />
          </TouchableOpacity>
          <View>
            {createTopBar(5,165,"rgba(255,255,255,0.8)",useNavigation())}
          </View>
        </View>
        <Agenda
          theme={{
            calendarBackground: "white", //agenda background
            agendaKnobColor: "rgba(28,56,107,0.9)", // knob color
            backgroundColor: "rgba(28,56,107,0.9)", // background color below agenda
            agendaDayTextColor: "white", // day name
            agendaDayNumColor: "white", // day number
            agendaTodayColor: "rgba(255,255,255,0.9)", // today in list
            monthTextColor: "rgba(28,56,107,0.9)", // name in calendar
            todayBackgroundColor: "rgba(28,56,107,0.9)",
            textSectionTitleColor: "rgba(28,56,107,0.9)",
            selectedDayBackgroundColor: "rgba(28,56,107,0.9)", // calendar sel date
            dayTextColor: "rgba(28,56,107,0.9)", // calendar day
            dotColor: "black", // dots
          }}
          minDate={"2022-01-01"}
          maxDate={"2023-01-01"}
          refreshing={false}
          refreshControl={null}
          items={this.state.items}
          selected={new Date()}
          initialNumToRender={5}
          pastScrollRange={5}
          futureScrollRange={5}
          windowSize={15}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={5}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
          loadItemsForMonth={this.loadFromList.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
        />
      </View>
    );
  }

  loadFromList() {
    const onReceive = (data) => {
      if (compare(data, this.state.events) === false) {
        this.setState({
          events: data,
          item: {},
        });
      }
    };
    eventsData(onReceive);
    this.state.events.map((key, index) => {
      const day = key.start;
      if (!this.state.items[day]) {
        this.state.items[day] = [];
        this.state.items[day].push({
          Name: "Event: " + key.name,
          programme: "programme: " + key.programme,
          start: "start day: " + key.start,
          end: "end day: " + key.end,
          height: Math.max(50, Math.floor(Math.random() * 150)),
        });
      }

      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height + 50 }]}>
        <Text>{item.Name}</Text>
        <Text>{item.programme}</Text>
        <Text>{item.start}</Text>
        <Text>{item.end}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>No Agenda On this day!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
