import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,

  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { getEvents } from "../Screens/RetrieveEvents";
import AppContext from "../AppContext";
import "../global.js";
import { NavigationContainer } from "@react-navigation/native";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";


//constants
const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
var dateToPass = "";
var specialty = "";
const RANGE = 12;
const initialDate = "2022-01-02";
var usersAgenda = {};
const days=""; //@Noku - this is what I used to fix the Calendar

const EventCalendar = () => {
  //use navigation
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
  // Keeps track of selected date
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const [state, setState] = useState({
    //@Noku -  this useState will be used to set the current state of our data
  // sets scheduleList to the data from database (firestore)
    EventList: [
      {
      key: 0,
      name:"",
      programme:"",
      ID:"",
      start_date:"",
      end_date:"",
      },
    ],
  })
 
  const onReceive = (EventList) => {
        // @Noku - when the list is received we set our scheduleList to the current received list (updating)

    setState((prevState) => ({
      EventList: (prevState.EventList = EventList),
    }));
  };
  // getEvents is a function from RetrieveEvents.js
  // it gets the list containing Events data from firestore
  getEvents(onReceive);

  // User's agenda
  // What to do when day is pressed.
  const onDayPress = (day) => {
    console.log("Just ran the redundant function");
  };

  return (
    <View>
    <CalendarList
      // testID={testIDs.calendarList.CONTAINER}
      current={initialDate}
      pastScrollRange={3}
      futureScrollRange={RANGE}
      // renderHeader={renderCustomHeader}
      theme={theme}
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
        dateToPass = day.dateString;
        console.log("dateToPass value before navigation:", dateToPass);
        navigation.navigate("DayAgenda"); // @Noku Does this js file exist? 
      }}
      markingType="period"
      // * The generateSchedule method does way too much at once, really caused issues with understanding
      // I need to add back in the "created_at","updated_at", "hospital_id", "specialty_id" into the generate Schedule function then strip out only the marked dates format.
      markedDates={generateSchedule(onReceive)} // now this function is the wrong format only to include: color, textColor and [startDate,endDate]
    />
    </View>
  );
};


const generateSchedule = (onReceive) => {
   // @Noku - this is the function needs work
};



const theme = {
  "stylesheet.calendar.header": {
    dayHeader: {
      fontWeight: "600",
      color: "#48BFE3",
    },
  },
  "stylesheet.day.basic": {
    today: {
      borderColor: "#48BFE3",
      borderWidth: 0.8,
    },
    todayText: {
      color: "#5390D9",
      fontWeight: "800",
    },
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 20,
    flex: 1,
    borderColor: "rgba(36,50,61,1)",
    borderWidth: 5,
  },
});

export default EventCalendar;

export { dateToPass };
export{ days};
