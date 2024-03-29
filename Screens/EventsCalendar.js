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
import { getCurrentDate } from "../functions";
import BottomSheet from "./BottomSheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Card, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import "./global";
import {schedulePushNotification} from "./SendNotification"
import { createTopBar } from "../HelperFunctions";
import { LinearGradient } from "expo-linear-gradient";



const { width, height } = Dimensions.get("screen");
const SPACING = 20;
const ICON_SIZE = 75;
const initialDate = getCurrentDate();
const today = new Date();
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
/*   const [btnstart, setBtnStart] = useState(false);
  const [btnend, setBtnEnd] = useState(false); */
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePicker] = useState(false);
  const [EnddatePickerVisible, setDatePickerEnd] = useState(false);

  return (
    <View style={styles.container}>
      {createTopBar(10, navigation)}
      <Modal
        style={styles.modalStyle}
        animationType={"fade"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        
        <View style={styles.modalStyle}>
        <LinearGradient
        colors={[
          " rgba(255,255,255,1)",
          " rgba(235,235,235,1)",
          "rgba(225,225,225,1)",
        ]}
        style={{flex:1,borderRadius:20}}>
          <Text style={{ marginTop:20, fontSize: 30, top:0,fontWeight:'bold', textAlign: "center" ,color:"rgba(0,0,0,0.75)"}}>
            Create Event
          </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   Title"
            placeholderTextColor="white"
            autoCapitalize="none"
            onChangeText={(newText) => {
              setEventName("   "+newText);
            }}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   Program"
            placeholderTextColor="white"
            autoCapitalize="none"
            onChangeText={(newText) => {
              setEventProgramme("   "+newText);
            }}
          />
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgba(0, 0, 0, 0.75)" : "rgba(25,25,25,0.9)",
              },
              {
                borderRadius: 10,
                margin: 10,
                flexDirection: "row",
                marginTop: 60,
                width:200,
                left:60
              },
            ]}
            onPress={() => {
              setDatePicker(true);
            }}
          >
            <Text style={{ margin: 30,color:'white' }}>Start</Text>
            <Text style={{ left:100, marginBottom: 10, marginTop: 20,color:'white',position:'absolute' }}>
              {startDate}
            </Text>
            <Text style={{ left:100, marginBottom: 10, marginTop: 40,color:'white',position:'absolute' }}>
              {"18:00"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgba(0, 0, 0, 0.75)" : "rgba(25,25,25,0.9)",
              },
              {
                borderRadius: 10,
                margin: 10,
                flexDirection: "row",
                width:200,
                left:60
              },
            ]}
            onPress={() => {
              setDatePickerEnd(true);
            }}
          >
            <Text style={{ margin: 30,color:'white' }}>End</Text>
            <Text style={{ left:100, marginBottom: 10, marginTop: 20,color:'white',position:'absolute' }}>
              {endDate}
            </Text>
            <Text style={{ left:100, marginBottom: 10, marginTop: 40,color:'white',position:'absolute' }}>
              {"18:00"}
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setSelectedDate(date), setDatePicker(false);
                  let datestr = selectedDate.toISOString().split("T")[0];
                  //console.log(datestr)
                  setStartDate(datestr);
                
              }}
              onCancel={() => {
                setDatePicker(false);
              }}
            />
             <DateTimePickerModal
              date={selectedEnd}
              isVisible={EnddatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setSelectedEnd(date), setDatePickerEnd(false);

                  let datestr = selectedEnd.toISOString().split("T")[0];
                  //console.log(datestr)
                  setEndDate(datestr);
               
              }}
              onCancel={() => {
                setDatePickerEnd(false);
              }}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonClose,
                {
                  marginRight: 40,
                  width: width / 3,
                  left: 20,
                  bottom: 30,
                  
                  backgroundColor: pressed
                    ? "rgba(128,0,0,0.5)"
                    : "rgba(128,18,0,0.75)",
                },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text
                onPress={() => setModalVisible(false)}
                style={[styles.textStyle]}
              >
                Close
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonClose,
                {
                  width: width / 3,
                  left: 30,
                  right: 30,
                  bottom: 30,
                  backgroundColor: pressed ? "rgba(28,56,107,1)" : "rgba(28,56,107,1)",
                },
              ]}
              onPress={() => {
                sendToFirestore(eventName, eventProgramme, startDate, endDate);
              }}
            >
              <Text style={[styles.textStyle]}>Save</Text>
            </Pressable>
          </View>
          </LinearGradient>
        </View>

      </Modal>

      <View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: "rgba(28,56,107,0.0)",
            position: "absolute",
            borderRadius: 50,
            width: 50,
            height: 50,
            zIndex: 1,
            right: 20,
            top: height - 220,
            alignItems: "center",
          }}
        >
          <AntDesign name="pluscircle" color="black" size={50} />
        </TouchableOpacity>
      </View>
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
        markedDates={GetMarkedDates()}
        onDayPress={(day) => {
          getDayEvents(day);
          eventData = dayData;
          if (showEvent == false) {
            showEvent = true;
          }
        }}
        onDayLongPress={(day) => {
          setModalVisible(true);
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
    backgroundColor: "rgba(30,81,123,1)",
  },
  input: {
    top:20,
    margin: 15,
    height: 50,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    backgroundColor: "rgba(28,56,107,0.9)",
    borderRadius:10,
    color:'white',
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
    backgroundColor: "rgba(120,120,120,0)",
    borderRadius:25,
    borderWidth:5,
    borderColor: "rgba(0,0,0,0.25)",
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