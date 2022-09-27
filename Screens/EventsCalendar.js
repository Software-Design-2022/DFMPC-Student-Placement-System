import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text,Pressable, LogBox, Modal, TouchableHighlight,Image,  Dimensions, } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { firebase, db } from "../firebase";
import { getCurrentDate } from "../HelperFunctions";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from '@expo/vector-icons';

const data=[];
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
  state = {
    modalVisible: false
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      events: [],
    };
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{flex:1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={{top:50,height:400,width:width/1.2,backgroundColor:'white',borderRadius:10,borderWidth:4}}>
              <Text style={{fontSize:25,top:10,textAlign:'center'}}>Create Event</Text>
              <Pressable
                style={[styles.button, styles.buttonClose,{width:width/3,left:width/4,bottom:-300}]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle]}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      <View>
      <TouchableOpacity onPress={() => this.setModalVisible(true)}
       style={{ backgroundColor: 'rgba(28,56,107,0.0)', position: 'absolute', borderRadius: 50,
        width: 50, height: 50, zIndex: 1, right: 20, top: height-250, alignItems: 'center' }} >
                    <AntDesign name="pluscircle" color='white' size={50} />
      </TouchableOpacity>
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
        //loadItemsForMonth={data}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:width/2,
    height:height/3
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    bottom:-height/5,
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
