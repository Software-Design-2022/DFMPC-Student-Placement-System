import React,  { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList
} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import {Calendar,CalendarList,Agenda} from 'react-native-calendars';
import studentData from '../dfmpc-student-placement-system.json'
import AppContext from '../AppContext';
import "../global.js";
<<<<<<< Updated upstream
import { NavigationContainer } from '@react-navigation/native';
=======
import { firebase } from "../firebase";
import { NavigationContainer } from "@react-navigation/native";
>>>>>>> Stashed changes


//constants 
const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
var days=""
var specialty=""
const RANGE = 12;
<<<<<<< Updated upstream
const initialDate = '2022-01-02'


=======
const initialDate = "2022-01-02";
var usersMarkedDatesList = {};
var usersAgendaList = {};
>>>>>>> Stashed changes

const CalendarView = () => {

  //use navigation
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
<<<<<<< Updated upstream
  // const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(initialDate);
  const [name, SetName] = useState('');
  // const navigation = useNavigation()

  //retrieve user details
  const scheduleList = studentData.schedules;
  console.log('Schedule List', scheduleList)
  const onDayPress = day => {
    setSelected(day.dateString);
  };


  

=======
  // Keeps track of selected date
  const [selectedDate, setSelectedDate] = useState(initialDate);

  //fetches record of schedules for all users
  // An array of schedule objects with no keys stored
  const fullScheduleList = studentData.schedules;
  // Also an array of schedule objects.. Not sure why it's parsing them as different datatypes
  const firebaseScheduleList = createFirebaseSchedule(authUserID);

  // usersAgendaList is a JSON object with only "stringDate","color","textColor" properties
  usersMarkedDatesList = generateSchedule(fullScheduleList);
  usersAgendaList; //This object is updated to include usersMarkedDatesList properties as well as "student_id";,"created_at" ,"updated_at" ,"hospital_id","specialty_id"
>>>>>>> Stashed changes
  return (

    //render calendar 
    <CalendarList
      // testID={testIDs.calendarList.CONTAINER}
      current={initialDate}
      pastScrollRange={3}
      futureScrollRange={RANGE}
      // renderHeader={renderCustomHeader}
      theme={theme}
      onDayPress={day => {
        console.log(day)
        days=day.dateString;
        console.log(days)
        
        navigation.navigate("DayAgenda");
      }}
      // markedDates={markedDates}
      markingType="period"
<<<<<<< Updated upstream

      //get marked dates using generateschedule and user credentials
      markedDates={generateSchedule(scheduleList)}
    />
  );

}



// generate marked dates
const generateSchedule = (scheduleList) => {


  
  let schedulesObj = {}
  scheduleList.forEach((schedule) => {

    let scheduleObj = {}

    //get the week for the schedule
    const week = getDateFromWeekNum(schedule.week_no,2022,schedule.specialty_duration);


    //figure out which days of the week in the schedule
    const daysInWeek = getDaysInWeek(week.startDate,schedule.specialty_duration);

    //only show schedule for correct user
     if(schedule.student_id!=parseInt(authUserID,10)+1){
       return{}
     }


     //default colours
     var startcolor='rgba(80,206,187,0.5)'
     var middlecolor='rgba(80,206,187,0.5)'
     var endcolor='rgba(80,206,187,0.5)'


     //change colour based on specialty 
     if(schedule.specialty_id==2){
      startcolor='rgba(226,135,67,0.5)'
      middlecolor='rgba(226,135,67,0.5)'
      endcolor='rgba(226,135,67,0.5)'
    
=======
      // * The generateSchedule method does way too much at once, really caused issues with understanding
      // Refactored this section to calculate the users agendalist before the calendar is rendered
      markedDates={usersMarkedDatesList} // now this function is the wrong format only to include: color, textColor and [startDate,endDate]
    />
  );
};
// Downloads the user's schedule from firebase
function createFirebaseSchedule(authUserID) {
  var schedules = [];
  firebase
    .database()
    .ref("/schedules")
    .on("value", (snapshot) => {
      const key = snapshot.forEach(function (data) {
        console.log("pushing this object to the array", data);
        schedules.push(data);
      });
    });
  return schedules;
}
// generate marked dates [Too specific, needs to include relevant info for agenda ]\
// Refactored generateSchedule to include data it "threw away". Namely "student_id";,"created_at" ,"updated_at" ,"hospital_id","specialty_id"
// Returns objects with properties: "startingDate","color","textColor"

const generateSchedule = (fullScheduleList) => {
  let userSchedulesListObj = {};
  let userMarkedDatesListObj = {};
  // Iterate through entire list of schedules for all users
  // Skip immediately if it's a different user, else parse the database object
  fullScheduleList.forEach((scheduleItem) => {
    let scheduleObj = {};
    let markedDateObj = {};

    //only show scheduleItem for correct user
    if (scheduleItem.student_id != authUserID) {
      return {};
>>>>>>> Stashed changes
    }
    else if(schedule.specialty_id==5){
      startcolor='rgba(8,181,245,0.5)'
      middlecolor='rgba(8,181,245,0.5)'
      endcolor='rgba(8,181,245,0.5)'
   
    }
    else if(schedule.specialty_id==6){
      startcolor='rgba(245,58,245,0.5)'
      middlecolor='rgba(245,58,245,0.5)'
      endcolor='rgba(245,58,245,0.5)'
   
    }
    else{
      startcolor='rgba(80,206,187,0.5)'
       middlecolor='rgba(80,206,187,0.5)'
       endcolor='rgba(80,206,187,0.5)'
    }
     
    // set information for each day
    daysInWeek.forEach((day, dayIndex) => {

      scheduleObj = {};
      if (dayIndex === 0) {
        scheduleObj.startingDate = true;
        scheduleObj.color = startcolor;
        scheduleObj.textColor = 'white';
      } else if (dayIndex > 0 && dayIndex <= 5) {
        scheduleObj.color = middlecolor;
        scheduleObj.textColor = 'white';
      } else {
        scheduleObj.endingDay = true;
        scheduleObj.color = endcolor;
        scheduleObj.textColor = 'white';
      }
<<<<<<< Updated upstream

      // Object.assign(schedulesObj, scheduleObj);
      schedulesObj[day] = scheduleObj;

    }) // end of days i week
    
  }) // End of Schedule List


  
  return schedulesObj;
}


=======
      // Packing the values into the schedule/agenda object
      scheduleObj.student_id = scheduleItem.student_id;
      scheduleObj.created_at = scheduleItem.created_at;
      scheduleObj.updated_at = scheduleItem.updated_at;
      scheduleObj.hospital_id = scheduleItem.hospital_id;
      scheduleObj.specialty_id = scheduleItem.specialty_id;
      scheduleObj.startingDate;
      scheduleObj.color;
      scheduleObj.textColor;

      markedDateObj.startingDate = scheduleObj.startingDate;
      markedDateObj.color = scheduleObj.color;
      markedDateObj.textColor = scheduleObj.textColor;
      // creating the object and stashing it in the user's schedule object list

      userSchedulesListObj[day] = scheduleObj;
      userMarkedDatesListObj[day] = markedDateObj;
    }); // end of days i week
  }); // End of Schedule List
  // Saving a user's schedule as individual objects for each day higher up in scope.
  usersMarkedDatesList = userMarkedDatesListObj;
  usersAgendaList = userSchedulesListObj;
  // To test function
  // console.log("Should be more verbose than marked again", usersAgendaList);
  // console.log("Should be a only 3 properties", userMarkedDatesListObj);
  return userMarkedDatesListObj;
};
>>>>>>> Stashed changes

// get days that the specialty will run over using specialty duration
const getDaysInWeek = (startDate,specialtyduration) => {

  let dates = [];
  // console.log('startDate', startDate) 
 console.log(startDate)
  for (let i = 0; i < specialtyduration; i++) {


    //takes current date and counts days prior to it for listing on calendar
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const formattedDate = currentDate.toISOString().split('T')[0];

    dates.push(formattedDate);
  }
  console.log('DatesList', dates);
  return dates;
  
}


// calculates correct week based on the weeknumber and specialty duration
const getDateFromWeekNum = (weekNum, year,specialtyduration) => {
  var daynum=weekNum*7;
  if(weekNum*7>30){
    var month=(weekNum*7)/30 +1;
  }
  else{
    var month=0;
  }
  while(daynum>30){
    daynum=daynum-30;
  }
  month=parseInt(month)
  var d = new Date(year, month, 1);
  console.log(d)
  const endDate = new Date(d.setDate(daynum));
  const startDate = new Date(year, month, 2);
  startDate.setDate(endDate.getDate() - specialtyduration);
  console.log(startDate,endDate)
  return({startDate: startDate,endDate: endDate});
  
}



const theme = {
  'stylesheet.calendar.header': {
    dayHeader: {
      fontWeight: '600',
      color: '#48BFE3'
    }
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8
    },
    todayText: {
      color: '#5390D9',
      fontWeight: '800'
    }
  }
};
    
  
const styles = StyleSheet.create({
  container: {
    marginTop:20,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius:20,
    flex:1,
    borderColor:"rgba(36,50,61,1)",
    borderWidth:5
  },
});
export default CalendarView;

export {days};