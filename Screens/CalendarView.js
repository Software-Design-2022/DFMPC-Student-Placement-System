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
import { NavigationContainer } from '@react-navigation/native';

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
var days=""
var specialty=""
const RANGE = 12;
const initialDate = '2022-01-02'
// const initialDate = new Date().toISOString().split('T')[0];




const CalendarView = () => {
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
  // const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(initialDate);
  const [name, SetName] = useState('');
  // const navigation = useNavigation()
  const scheduleList = studentData.schedules;
  console.log('Schedule List', scheduleList)
  const onDayPress = day => {
    setSelected(day.dateString);
  };

  // const markedDates = {
  //   [selected]: {
  //     selected: true,
  //     disableTouchEvent: true,
  //     selectedColor: '#5E60CE',
  //     selectedTextColor: 'white'
  //   }
  // };
  // const setwords = ({word}) => {
  //   words=word
  // }

  

  return (
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
      markedDates={generateSchedule(scheduleList)}
    />
  );

}



const generateSchedule = (scheduleList) => {
  let schedulesObj = {}
  scheduleList.forEach((schedule) => {

    let scheduleObj = {}

    const week = getDateFromWeekNum(schedule.week_no,2022,schedule.specialty_duration);

    const daysInWeek = getDaysInWeek(week.startDate,schedule.specialty_duration);

    
     if(schedule.student_id!=parseInt(authUserID,10)+1){
       return{}
     }
     var startcolor='rgba(80,206,187,0.5)'
     var middlecolor='rgba(80,206,187,0.5)'
     var endcolor='rgba(80,206,187,0.5)'

     if(schedule.specialty_id==2){
      startcolor='rgba(226,135,67,0.5)'
      middlecolor='rgba(226,135,67,0.5)'
      endcolor='rgba(226,135,67,0.5)'
    
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

      // Object.assign(schedulesObj, scheduleObj);
      schedulesObj[day] = scheduleObj;

    }) // end of days i week
    
  }) // End of Schedule List

  console.log('SchedulesObj', schedulesObj)
  return schedulesObj;
}

const getDaysInWeek = (startDate,specialtyduration) => {

  let dates = [];
  // console.log('startDate', startDate) 
 console.log(startDate)
  for (let i = 0; i < specialtyduration; i++) {

    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const formattedDate = currentDate.toISOString().split('T')[0];

    dates.push(formattedDate);
  }
  console.log('DatesList', dates);
  return dates;
  
}

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

const getStudentSchedule = (scheduleList, studentId) => {

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