import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import AppContext from "../AppContext";
import "../global.js";
import { NavigationContainer } from "@react-navigation/native";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { firebase, db } from "../firebase";

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
const days = ""; //@Noku - this is what I used to fix the Calendar

const EventCalendar = () => {
  //use navigation
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
  // Keeps track of selected date

  async function eventsData() {
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
          events.push(JSON.stringify({ key, start, end, name, id, programme })); //this is an array of strings
        });
      });
    console.log(events);
    return events;
  }

  var EventList = eventsData();
  console.log(EventList); //@Peace - in the console, you'll see a Promise
  //If you expand it, sometimes you'll see the events array other times you see undefined because the promise is unfulfiled

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
      />
    </View>
  );
};

const generateSchedule = (onReceive) => {
  /**
   * Function to generate the schedule for the calendar
   * TODO: Create a calendar with the student's ID as their schedule.
   * For loop through the Event List and add the dates to the calendar as followed.
   * Create .saveEvent() function to save the event to the database.
   * RNCalendarEvents.saveEvent(specialtyName, {
   * calendarId: studentID,
   * startDate: start_date, \\ Correct format '2016-08-19T19:26:00.000Z'
   * recurrenceRule: {
   * frequency: 'weekly',
   * endDate: end_date,
   * }
   * location:  hospitalID,
   * notes: 'Bring sunglasses'
   * }
   */
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
export { days };
