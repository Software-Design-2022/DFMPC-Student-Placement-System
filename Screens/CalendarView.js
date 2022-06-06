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
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

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

const CalendarView = () => {
  //use navigation
  const navigation = useNavigation(); // use navigation
  const myContext = useContext(AppContext);
  // const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(initialDate);
  const [name, SetName] = useState("");
  // const navigation = useNavigation()

  //retrieve user details
  const scheduleList = studentData.schedules;
  console.log("Schedule List", scheduleList);
  const onDayPress = (day) => {
    setSelected(day.dateString);
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
      onDayPress={(day) => {
        console.log(day);
        days = day.dateString;
        console.log(days);

        navigation.navigate("DayAgenda");
      }}
      // markedDates={markedDates}
      markingType="period"
      //get marked dates using generateschedule and user credentials
      markedDates={generateSchedule(scheduleList)}
    />
  );
};

// generate marked dates
const generateSchedule = (scheduleList) => {
  let schedulesObj = {};
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
      schedule.specialty_duration
    );

    //only show schedule for correct user
    if (schedule.student_id != parseInt(authUserID, 10) + 1) {
      return {};
    }

    //default colours
    var startcolor = "rgba(80,206,187,0.5)";
    var middlecolor = "rgba(80,206,187,0.5)";
    var endcolor = "rgba(80,206,187,0.5)";

    //change colour based on specialty
    if (schedule.specialty_id == 2) {
      startcolor = "rgba(226,135,67,0.5)";
      middlecolor = "rgba(226,135,67,0.5)";
      endcolor = "rgba(226,135,67,0.5)";
    } else if (schedule.specialty_id == 5) {
      startcolor = "rgba(8,181,245,0.5)";
      middlecolor = "rgba(8,181,245,0.5)";
      endcolor = "rgba(8,181,245,0.5)";
    } else if (schedule.specialty_id == 6) {
      startcolor = "rgba(245,58,245,0.5)";
      middlecolor = "rgba(245,58,245,0.5)";
      endcolor = "rgba(245,58,245,0.5)";
    } else {
      startcolor = "rgba(80,206,187,0.5)";
      middlecolor = "rgba(80,206,187,0.5)";
      endcolor = "rgba(80,206,187,0.5)";
    }

    // set information for each day
    daysInWeek.forEach((day, dayIndex) => {
      scheduleObj = {};
      if (dayIndex === 0) {
        scheduleObj.startingDate = true;
        scheduleObj.color = startcolor;
        scheduleObj.textColor = "white";
      } else if (dayIndex > 0 && dayIndex <= 5) {
        scheduleObj.color = middlecolor;
        scheduleObj.textColor = "white";
      } else {
        scheduleObj.endingDay = true;
        scheduleObj.color = endcolor;
        scheduleObj.textColor = "white";
      }

      // Object.assign(schedulesObj, scheduleObj);
      schedulesObj[day] = scheduleObj;
    }); // end of days i week
  }); // End of Schedule List

  return schedulesObj;
};

// get days that the specialty will run over using specialty duration
const getDaysInWeek = (startDate, specialtyduration) => {
  let dates = [];
  // console.log('startDate', startDate)
  console.log(startDate);
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
  console.log(startDate, endDate);
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
