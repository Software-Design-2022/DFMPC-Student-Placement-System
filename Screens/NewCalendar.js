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

  const [show, setShow] = useState(true);
  const eventInfo = [
    {
      key: 0,
      programme: "test",
      name: "angela",
      id: 0,
      start: "2022-10-08",
      end: "2022-10-08",
    },
  ];
  // eventData=eventInfo;
  return (
    <View style={styles.container}>
      <Calendar
        style={{margin:30}}
        markedDates={GetMarkedDates()}
        onDayPress={(day) => {
          getDayEvents(day);
          setShouldShow(true);
          eventData = dayData;
          setShow(true);
        }}
        onDayLongPress={(day) => {
          getDayEvents(day);
          setShouldShow(true);
          eventData = dayData;
          setShow(true);
        }}
      />
      {/*       <View style={styles.container}>{shouldShow ? setShow(true) : null}</View>  */}
      <Provider>
        <View>
          <BottomSheet
            show={show}
            onDismiss={() => {
              setShow(false);
            }}
            eventInfo1={dayData}
          ></BottomSheet>
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
