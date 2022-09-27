import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, LogBox } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { firebase, db } from "../firebase";
import { getCurrentDate } from "../HelperFunctions";

async function eventsData(onReceiveList) {
  // this function get events from firebase
  const initialDate = getCurrentDate();
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
        // events.push(JSON.stringify({key, start, end, name, id, programme})); //this is an array of strings
        events.push({
          key: key,
          start: start,
          end: end,
          id: id,
          programme: programme,
          name: name,
        });
      });
    });

  onReceiveList(events);
}

LogBox.ignoreLogs(["Setting a timer"]); //ignore warning for development purposes

export default class EventsCalendar extends React.Component {
  constructor(props) {
    // this is the constructor
    super(props);
    this.state = {
      items: {}, // this is the object that is used to populate the calendar
      events: [], // this is the array that contains the events
    };
  }

  render() {
    return (
      // this is the calendar
      <Agenda
        theme={{
          calendarBackground: "white", //agenda background color
          agendaKnobColor: "rgba(28,56,107,0.9)", // knob color
          backgroundColor: "rgba(28,56,107,0.9)", // background color below agenda
          agendaDayTextColor: "white", // day name color
          agendaDayNumColor: "white", // day number color
          agendaTodayColor: "rgba(28,56,107,0.9)", // today in list
          monthTextColor: "rgba(28,56,107,0.9)", // name in calendar header
          todayBackgroundColor: "rgba(28,56,107,0.9)", // today in calendar
          textSectionTitleColor: "rgba(28,56,107,0.9)", // month name
          selectedDayBackgroundColor: "rgba(28,56,107,0.9)", // calendar selected date bg
          dayTextColor: "rgba(28,56,107,0.9)", // calendar day number
          dotColor: "black", // dots on dates
        }}
        items={this.state.items} // the events
        selected={initialDate}
        loadItemsForMonth={this.loadFromList.bind(this)} // callback that gets called when the calendar is rendered
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)} // this is the function that is used to render the events
      />
    );
  }

  loadFromList() {
    // callback function
    const onReceive = (data) => {
      this.setState({
        events: data,
      });
    };
    eventsData(onReceive); // (async) function that gets the data from firebase
    this.state.events.map((key, index) => {
      const day = key.start;

      if (!this.state.items[day]) {
        // if there is no event on that day
        this.state.items[day] = [];

        // add the event to the list
        this.state.items[day].push({
          Name: "Event: " + key.name,
          Programme: "Programme: " + key.programme,
          start: "start day: " + key.start,
          end: "end day: " + key.end,
          height: Math.max(50, Math.floor(Math.random() * 150)), // random height
        });
      }
      //console.log(this.state.items);
      const newItems = {}; // this is the object that is used to populate the calendar

      // the code that makes the events appear on the calendar
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key]; //
      });

      // the state that is used to render the calendar
      this.setState({
        items: newItems,
      });
    });
  }

  // this is the card that shows the event details
  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.Name}</Text>
        <Text>{item.Programme}</Text>
        <Text>{item.start}</Text>
        <Text>{item.end}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    // this is the card that shows when there are no events
    return (
      <View style={styles.emptyDate}>
        <Text>No Agenda On this day!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
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
});
