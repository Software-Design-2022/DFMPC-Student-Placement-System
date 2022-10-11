import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, LogBox } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { firebase, db } from "../firebase";
import { getCurrentDate } from "../HelperFunctions";

const days = "";
const initialDate = getCurrentDate();
async function getSchedule(onReceiveList) {
  const schedules = [];
  var snapshot = await firebase
    .firestore()
    .collection("schedules")
    .where("student_id", "==", authUserID) //@Noku - this is where we are filtering the data to be specific to the student logged in
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        //push the required data to the array
        schedules.push({
          key: schedules.length + 1,
          student_id: doc.data().student_id,
          SpecialtyName: doc.data().SpecialtyName,
          hospital_ID: doc.data().hospital_id,
          specialty_duration: doc.data().specialty_duration,
          start: doc.data().start_date,
          end: doc.data().end_date,
          specialty_id: doc.data().specialty_id,
        });
      });
    });

  onReceiveList(schedules);
}

LogBox.ignoreLogs(["Setting a timer"]);

export default class AgendaCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      events: [],
    };
  }

  static navigationOptions = {
    headerTitle: "Calendar",
    headerRight: (
      <Button
        onPress={() => navigator.navigate("EventsCalendar")}
        title="View Events"
        color="#000000"
      />
    ),
  };
  render() {
    return (
      <Agenda
        theme={{
          calendarBackground: "white", //agenda background
          agendaKnobColor: "rgba(28,56,107,0.9)", // knob color
          backgroundColor: "rgba(28,56,107,0.9)", // background color below agenda
          agendaDayTextColor: "rgba(28,56,107,0.9)", // day name
          agendaDayNumColor: "rgba(28,56,107,0.9)", // day number
          agendaTodayColor: "rgba(28,56,107,0.9)", // today in list
          monthTextColor: "rgba(28,56,107,0.9)", // name in calendar
          todayBackgroundColor: "rgba(28,56,107,0.9)",
          textSectionTitleColor: "rgba(28,56,107,0.9)",
          selectedDayBackgroundColor: "rgba(28,56,107,0.9)", // calendar sel date
          dayTextColor: "rgba(28,56,107,0.9)", // calendar day
          dotColor: "green", // dots
        }}
        items={this.state.items}
        selected={new Date()}
        loadItemsForMonth={this.loadFromList.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadFromList() {
    const onReceive = (data) => {
      this.setState({
        events: data,
      });
    };
    getSchedule(onReceive);
    this.state.events.map((key, index) => {
      const day = key.start;

      if (!this.state.items[day]) {
        this.state.items[day] = [];
        this.state.items[day].push({
          specialty: "Specialty: " + key.SpecialtyName,
          start: "start day: " + key.start,
          end: "end day: " + key.end,
          hospital: "hospital: " + "Baragwanath Hospital",
          height: Math.max(50, Math.floor(Math.random() * 150)),
        });
      }
      //console.log(this.state.items);
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
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.specialty}</Text>
        <Text>{item.start}</Text>
        <Text>{item.end}</Text>
        <Text>{item.hospital}</Text>
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

export { days };
