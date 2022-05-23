import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getSchedule } from "./RetrieveSchedules";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import studentData from "../dfmpc-student-placement-system.json";
import AppContext from "../AppContext";

const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 260;

/* THIS PAGE IS CURRENTLY UNDER DEVELOPMENT AND AS SUCH IS UNCOMMENTED*/

// Models a single element from the array of schedules from retrieveSchedule object
const Schedule = () => {
  // Sets the state of the schedules list as stateSchedulesList. A state pattern representation of the schedules list.
  const [stateSchedulesList, setStateSchedulesList] = useState({
    scheduleList: [
      {
        key1: 0,
        created_at: "",
        hospital: "",
        ID: "",
        specialty_duration: "",
        specialty_id: "",
        student_id: "",
        updated_at: "",
        week_no: "",
      },
    ],
  });
  // Script/Hook to update the user's stateSchedulesList to a new state once an input has been received
  const onReceive = (scheduleList) => {
    // Sets the state of the schedules list to the method's input.
    // Sets the state of the previous schedules list to the new schedules list.
    setState((prevState) => ({
      scheduleList: (prevState.scheduleList = scheduleList),
    }));
  };

  //Calls the getSchedule method from RetrieveSchedules view to retrieve a scheduleList and onReceive to update the scheduleListState
  //getSchedule(onReceive)
  //console.log(stateSchedulesList.scheduleList)

  const navigation = useNavigation(); //Sets view to show nav bar
  const scheduleList = studentData.schedules; //Used as a proxy for pulling data from FireStore. We should use a global variable here to store the user's information
  console.log("Schedule List", scheduleList);
  generateSchedule(scheduleList);
  return (
    <View>
      <Text>scheduleList</Text>
    </View>
  );
};

// Used to populate a Schedules object given a student's schedule list and handle coloring conditions
const generateSchedule = (scheduleList) => {
  // List of the schedule objects, in order of the day of the week.
  let schedulesObj = {};
  // Iterate through given schdules list
  scheduleList.forEach((schedule) => {
    // An object to represent the schedule's informtion.
    let scheduleObj = {};

    const week = getDateFromWeekNum(schedule.week_no, 2022);
    const daysInWeek = getDaysInWeek(week.startDate);

    // Assign each day's schedule object it's corresponding values based on conditions.
    daysInWeek.forEach((day, dayIndex) => {
      scheduleObj = {};
      if (dayIndex === 0) {
        scheduleObj.startingDate = true;
        scheduleObj.color = "#50cebb";
        scheduleObj.textColor = "white";
      } else if (dayIndex > 0 && dayIndex <= 5) {
        scheduleObj.color = "#70d7c7";
        scheduleObj.textColor = "white";
      } else {
        scheduleObj.endingDay = true;
        scheduleObj.color = "black";
        scheduleObj.textColor = "white";
      }

      // Object.assign(schedulesObj, scheduleObj);
      // Set's the corresponding day's schedule object.
      schedulesObj[day] = scheduleObj;
    }); // end of days i week
  }); // End of Schedule List

  console.log("SchedulesObj", schedulesObj);
  return schedulesObj;
};

const getDaysInWeek = (startDate) => {
  let dates = [];
  // console.log('startDate', startDate)

  for (let i = 1; i < 8; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const formattedDate = currentDate.toISOString().split("T")[0];

    dates.push(formattedDate);
  }
  return dates;
  // console.log('DatesList', dates);
};

const getDateFromWeekNum = (weekNum, year) => {
  var d = new Date(year, 0, 1);

  const endDate = new Date(d.setDate(d.getDate() + weekNum * 7 - 1));
  const startDate = new Date(year, 0, 1);
  startDate.setDate(endDate.getDate() - 6);

  return { startDate: startDate, endDate: endDate };
};

// TODO: sUsed to retrieve User's schedule list, given their ID. Also used to set the scheduleList object.
const getStudentSchedule = (scheduleList, studentId) => {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(18,33,65,0.8)",
  },
  header: {
    flexDirection: "row",
    padding: 10,
  },
  item: {
    backgroundColor: "rgba(18,33,65,0.8)",
    padding: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  contentHide: {
    color: "white",
    backgroundColor: "rgba(44,59,92,255)",
    overflow: "hidden",
    maxHeight: 0,
  },
  content_show: {
    color: "white",
    backgroundColor: "rgba(44,59,92,255)",
    marginBottom: 10,
    marginTop: 10,
    padding: 30,
    opacity: 1,
    maxHeight: 9999,
  },
});

export default Schedule;
