import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import studentData from "../dfmpc-student-placement-system.json";
import AppContext from "../AppContext";
import "../global.js";
import { NavigationContainer } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { auth, firebase } from "../firebase";

//constants
const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
var days = "";
var specialty = "";
const RANGE = 12;
const initialDate = "2022-01-02";

// Uses realtime, use username to go into schedules table and copy only the objects with the same student_id as authUserId
const getScheduleListRealtime = () => {
  let schedulesArray = [];
  firebase
    .database()
    .ref("/schedules")
    .once("value", (snapshot) => {
      //traverse each schedule in schedules
      const key = snapshot.forEach(function (data) {
        // Check if it student_id matches authUserID
        // If so, push it onto the schedulesArray
        if (snapshot.child(data.key + "/student_id").val() === authUserID) {
          console.log("Matching schedule item found for UserID:", authUserID);
          schedulesArray.push(snapshot.child(data.key).val());
        }
      });
    });
  console.log("Matching Schedules List:", schedulesArray);
  // TODO: BIG Debug, this should return the exact same data type as studentData.schedules.(array of objects)
  // Instead it shows up as an 'non-empty' array that has no index, instead of array of objects, then coloring should work
  return schedulesArray;
};

const CalendarView = () => {
  //use navigation
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
  // const [selectedDateId, setSelectedDateId] = useState(null);
  // State pattern to represent the currently selected date.
  const [selectedDate, setSelectedDate] = useState(initialDate);
  // State pattern used to represent the authorized user's Name
  const [name, SetName] = useState("");
  // const navigation = useNavigation()

  //retrieve user details\
  // const scheduleList = getScheduleListRealtime();
  const scheduleList = studentData.schedules;
  console.log("User's Schedule List:", studentData.schedules);
  console.log("Get Firestore Schedule List:", getScheduleListRealtime());
  const onDayPress = (day) => {
    // Set's selectedDate state to the selected date
    setSelectedDate(day.dateString);
  };

  return (
    //render calendar
    <CalendarList
      // testID={testIDs.calendarList.CONTAINER}
      current={initialDate}
      pastScrollRange={3}
      futureScrollRange={RANGE}
      // renderHeader={renderCustomHeader}
      theme={theme}
      // Sets onPress to navigate to that agenda and set selected date.
      onDayPress={(day) => {
        console.log("Day", day, "selected");
        days = day.dateString;
        console.log("Days =", days);

        navigation.navigate("DayAgenda");
      }}
      // markedDates={markedDates}
      markingType="period"
      //get marked dates using generateschedule and user credentials
      // Bug: Only generates/draws for one of each speciality ID
      markedDates={generateSchedule(scheduleList)}
    />
  );
};

// generate marked dates
const generateSchedule = (scheduleList) => {
  let schedulesObj = {};

  // The function only works for one of each specialty 1, 5*, 1*, 1, 2, 2, 2*
  scheduleList.forEach((schedule) => {
    let scheduleObj = {};

    //get the week for the schedule
    const week = getDateFromWeekNum(
      schedule.week_no,
      2022,
      schedule.specialty_duration
    );

    //figure out which days of the week in the schedule
    const daysInWeek = getDaysInWeek(
      week.startDate,
      schedule.specialty_duration,
      schedule.specialty_id
    );

    //only show schedule for correct user
    if (schedule.student_id != parseInt(authUserID, 10) + 1) {
      return {};
    }

    //default colours
    var startcolor = "rgba(80,206,187,0.5)";
    var middlecolor = startcolor;
    var endcolor = middlecolor;

    //change colour based on specialty
    {
      if (schedule.specialty_id == 1) {
        startcolor = "rgba(226,135,67,0.5)";
      } else if (schedule.specialty_id == 2) {
        startcolor = "rgba(8,181,245,0.5)";
      } else if (schedule.specialty_id == 3) {
        startcolor = "rgba(245,158,45,0.5)";
      } else if (schedule.specialty_id == 4) {
        startcolor = "rgba(25,8,245,0.5)";
      } else if (schedule.specialty_id == 5) {
        startcolor = "rgba(180,58,230,0.5)";
      } else if (schedule.specialty_id == 6) {
        startcolor = "rgba(245,58,24,0.5)";
      } else {
        startcolor = "rgba(80,206,187,0.5)";
      }
      middlecolor = startcolor;
      endcolor = middlecolor;
    }
    // Iterates through each schedule object in a week
    daysInWeek.forEach((day, dayIndex) => {
      // Stores appropriate schedule item as scheduleObj
      scheduleObj = {};
      if (dayIndex === 0) {
        scheduleObj.startingDate = true;
        scheduleObj.color = startcolor;
        scheduleObj.textColor = "white";
      } else if (dayIndex > 0 && dayIndex <= 7) {
        scheduleObj.color = middlecolor;
        scheduleObj.textColor = "white";
      } else {
        scheduleObj.endingDay = true;
        scheduleObj.color = endcolor;
        scheduleObj.textColor = "white";
      }

      // Object.assign(schedulesObj, scheduleObj);
      // Assigns the day's
      schedulesObj[day] = scheduleObj;
      // schedulesObj.push(scheduleObj);
    }); // end of days i week
  }); // End of Schedule List

  return schedulesObj;
};

// get days that the specialty will run over using specialty duration

const getDaysInWeek = (startDate, specialtyduration, specialty_id) => {
  let dates = [];
  // console.log('startDate', startDate)
  console.log("Start Date:", startDate);
  console.log("SpecialityID:", specialty_id);
  for (let i = 0; i < specialtyduration; i++) {
    //takes current date and counts days prior to it for listing on calendar
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const formattedDate = currentDate.toISOString().split("T")[0];

    dates.push(formattedDate);
  }
  console.log("DatesList", dates);
  return dates;
};

// calculates correct week based on the weeknumber and specialty duration
const getDateFromWeekNum = (weekNum, year, specialtyduration) => {
  var daynum = weekNum * 7;
  if (weekNum * 7 > 30) {
    var month = (weekNum * 7) / 30 + 1;
  } else {
    var month = 0;
  }
  while (daynum > 30) {
    daynum = daynum - 30;
  }
  month = parseInt(month);
  var d = new Date(year, month, 1);
  console.log(d);
  const endDate = new Date(d.setDate(daynum));
  const startDate = new Date(year, month, 2);
  startDate.setDate(endDate.getDate() - specialtyduration);
  console.log("Start Date:", startDate, ", End Date:", endDate);
  return { startDate: startDate, endDate: endDate };
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
export default CalendarView;
export { days };
