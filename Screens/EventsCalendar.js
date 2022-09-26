import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, LogBox, TouchableHighlight,Image,  Dimensions, } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { firebase, db } from "../firebase";
import { getCurrentDate } from "../HelperFunctions";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get("screen");
const SPACING = 20;
const ICON_SIZE = 75;
const initialDate = getCurrentDate();
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

LogBox.ignoreLogs(["Setting a timer"]);

export default class EventsCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      events: [],
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
      <View style={{zIndex:1}}>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0)"
          style={{
            flex: 1,
            width: ICON_SIZE,
            height: ICON_SIZE,
            position: "absolute",
            borderRadius: ICON_SIZE,
            marginBottom:SPACING/2, 
            zIndex:1,
            top:height-150-ICON_SIZE,
            right: -5,

          }}
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
           <Image
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
              shadowRadius: 20,
            }}
            source={require("./images/add_event.png")}
          /> 
          </TouchableHighlight>
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
        items={this.state.items}
        selected={new Date()}
        loadItemsForMonth={this.loadFromList.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
      </View>
      
    );
  }

  loadFromList() {
    const onReceive = (data) => {
      this.setState({
        events: data,
      });
    };
    eventsData(onReceive);
    this.state.events.map((key, index) => {
      const day = key.start;

      if (!this.state.items[day]) {
        this.state.items[day] = [];
        this.state.items[day].push({
          Name: "Event: " + key.name,
          Programme: "Programme: " + key.programme,
          start: "start day: " + key.start,
          end: "end day: " + key.end,
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
      <View style={[styles.item, { height:100 }]}>
        <Text>{item.Name}</Text>
        <Text>{item.Programme}</Text>
        <Text>{item.start}</Text>
        <Text>{item.end}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View>
      <View style={styles.emptyDate}>
        <Text>No events on this day!</Text>
      </View>
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
