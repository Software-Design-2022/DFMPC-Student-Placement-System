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
  TouchableOpacity
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { getSchedule } from './RetrieveSchedules';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import studentData from '../dfmpc-student-placement-system.json'
import AppContext from '../AppContext';

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 260;









/* THIS PAGE IS CURRENTLY UNDER DEVELOPMENT AND AS SUCH IS UNCOMMENTED*/












const Schedule = () => {
  const[state,setState]=useState({scheduleList: [{key1:0,
  created_at:"",
  hospital:"",
  ID:"",
  specialty_duration:"",
  specialty_id:"",
  student_id:"",
  updated_at:"",
  week_no:"",
  }]}) 


  const onReceive = (scheduleList) => {

    setState(prevState => ({
      scheduleList: prevState.scheduleList = scheduleList,

    }));
  }
  //getSchedule(onReceive)
  //console.log(state.scheduleList)
  const navigation = useNavigation();
  const scheduleList = studentData.schedules;
  console.log('Schedule List', scheduleList)
  generateSchedule(scheduleList)
  return (
      <View><Text>scheduleList</Text></View>
    
     );
};

const generateSchedule = (scheduleList) => {
  let schedulesObj = {}
  scheduleList.forEach((schedule) => {

    let scheduleObj = {}

    const week = getDateFromWeekNum(schedule.week_no,2022);

    const daysInWeek = getDaysInWeek(week.startDate);

    daysInWeek.forEach((day, dayIndex) => {

      scheduleObj = {};
      if (dayIndex === 0) {
        scheduleObj.startingDate = true;
        scheduleObj.color = '#50cebb';
        scheduleObj.textColor = 'white';
      } else if (dayIndex > 0 && dayIndex <= 5) {
        scheduleObj.color = '#70d7c7';
        scheduleObj.textColor = 'white';
      } else {
        scheduleObj.endingDay = true;
        scheduleObj.color = 'black';
        scheduleObj.textColor = 'white';
      }

      // Object.assign(schedulesObj, scheduleObj);
      schedulesObj[day] = scheduleObj;

    }) // end of days i week
    
  }) // End of Schedule List

  console.log('SchedulesObj', schedulesObj)
  return schedulesObj;
}

const getDaysInWeek = (startDate) => {

  let dates = [];
  // console.log('startDate', startDate) 

  for (let i = 1; i < 8; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const formattedDate = currentDate.toISOString().split('T')[0];

    dates.push(formattedDate);
  }
  return dates;
  // console.log('DatesList', dates);
}

const getDateFromWeekNum = (weekNum, year) => {
  var d = new Date(year, 0, 1);
  
  const endDate = new Date(d.setDate(d.getDate() + (weekNum * 7) - 1));
  const startDate = new Date(year, 0, 1);
  startDate.setDate(endDate.getDate() - 6);

  return({startDate: startDate,endDate: endDate});
  
}

const getStudentSchedule = (scheduleList, studentId) => {

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(18,33,65,0.8)',
  },
  header:{
  flexDirection:'row',
  padding:10,
  },
  item:{
    backgroundColor:'rgba(18,33,65,0.8)',
    padding:20,
  },
  itemText:{
    fontSize: 16,
    fontWeight:'500',
    color:'white'


  },
  contentHide: {
    color:'white',
    backgroundColor: 'rgba(44,59,92,255)',
    overflow: "hidden",
    maxHeight: 0

  },
  content_show:{
    color:'white',
    backgroundColor:'rgba(44,59,92,255)',
    marginBottom:10,
    marginTop:10,
    padding:30,
    opacity: 1,
    maxHeight:9999,
   

  }
});

export default Schedule;
