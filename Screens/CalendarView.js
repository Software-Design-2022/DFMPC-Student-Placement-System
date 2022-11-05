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
import { firebase } from "../firebase";
import { getCurrentDate } from "../HelperFunctions";
import { useNavigation } from "@react-navigation/core";
import "./global";
import { createTopBar } from "../HelperFunctions";



const { width, height } = Dimensions.get("screen");

const compare = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const randomColor = generateColor();
const randomColor2 = generateColor();
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




const validateInput = (eventtext, notetext) => {
  let valid = true;
  if (JSON.stringify(eventtext).length - 2 <= 0) {
    Alert.alert("Warning", "Event name cannot be left empty", [
      { text: "OK", onPress: () => {} },
    ]);
    valid = false;
  }

  if (JSON.stringify(notetext).length - 2 <= 0) {
    Alert.alert("Warning", "Event programme cannot be left empty", [
      { text: "OK", onPress: () => {} },
    ]);
    valid = false;
  }
  return valid;
};

async function sendToFirestore(
  eventtext,
  notetext,
  startdatetext,
  enddatetext
) {
  if (validateInput(eventtext, notetext) == true) {
    await firebase
      .firestore()
      .collection("events")
      .add({
        name: eventtext,
        start_date: startdatetext,
        end_date: enddatetext,
        id: Math.max(50, Math.floor(Math.random() * 150)),
        programme: notetext,
      })
      .then(() => {
        Alert.alert("Event Added");
      });
  }
}

const EventsCalendar = () => {
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

  const [dayData, setDayData] = useState([{}]);
  const navigation = useNavigation();

  const GetMarkedDates = () => {
    let markedDay = {};

    EventsState.events.map((item, key) => {
      if (compare(item.start, item.end)) {
        markedDay[item.start] = {
          startingDay: true,
          endingDay: true,
          selected:true,
          marked: true,
          color: randomColor2,
          dotColor: "blue",
        };
      } else {
        markedDay[item.start] = {
          startingDay: true,
          color: randomColor,
          textColor: "white",
          marked: true,
          dotColor: "black",
        };
        markedDay[item.end] = {
          endingDay: true,
          color: randomColor,
          textColor: "white",
          marked: true,
          dotColor: "black",
        };
      }
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


  const [eventName, setEventName] = useState("");
  const [eventProgramme, setEventProgramme] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEnd, setSelectedEnd] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePicker] = useState(false);
  const [EnddatePickerVisible, setDatePickerEnd] = useState(false);

  return (
    <View style={styles.container}>
      {createTopBar(10, navigation)}
      <View style={{flex:1}}>
      <Calendar
        style={{
          shadowColor: "black",
          height: 500,
          marginTop: 80,
          marginBottom: 30,
          marginLeft: 30,
          marginRight: 30,
        }}
        markingType={"period"}
        markedDates={{}}
        onDayPress={(day) => {
          getDayEvents(day);
          eventData = dayData;
          if (showEvent == false) {
            showEvent = true;
          }
        }}
      />
      </View>
      <View style={{flex:1,zIndex:1,bottom:10,left:10,position:'absolute'}}>
        <TouchableOpacity onPress={() => {
            navigation.navigate("EventsCalendar");
          }}>
        <Text style={{color:'rgba(0,0,0,1)',fontWeight:'bold',fontSize:15}}>{'Go to Events Calendar >>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(28,56,107,1)",
  },
  input: {
    margin: 15,
    height: 50,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    backgroundColor: "rgba(28,56,107,0.5)",
    borderRadius:10
  },
  button: {
    marginTop: 100,
    display: "flex",
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2AC062",
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  modalStyle: {
    zIndex: 100,
    height: height - 210,
    width: width - 40,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 80,
    backgroundColor: "rgba(28,56,107,1)",
    borderRadius:25
  },
  closeButton: {
    display: "flex",
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: "100%",
    height: 350,
  },

  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: "#00479e",
    textAlign: "center",
  },

  buttonClose: {
    marginRight: 30,
    marginLeft: 10,
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
export default EventsCalendar;