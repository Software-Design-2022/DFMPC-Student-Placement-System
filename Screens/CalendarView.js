import React,  { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {useNavigation} from '@react-navigation/core'
import {Calendar,CalendarList,Agenda} from 'react-native-calendars';
import studentData from '../dfmpc-student-placement-system.json'
import AppContext from '../AppContext';

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
var days=""
const RANGE = 12;
const initialDate = '2022-01-01'
// const initialDate = new Date().toISOString().split('T')[0];


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Schedule',
    destination: 'Schedule',
    image: require("./schedule.png"),
  },
  
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Calendar',
    destination: 'CalendarView',
    image: require("./calendar.png"),
  },
  {
    id: '38694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Assignments',
    destination: 'BackgroundTest',
    image: require("./assignment.png"),
  },
  {
    id: '28694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Tasks',
    destination: 'BackgroundTest',
    image: require("./tasks.png"),
  },
  {
    id: '18694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Logbook',
    destination: 'BackgroundTest',
    image: require("./logbook.png"),
  },
  
  {
    id: '08694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Settings',
    destination: 'SettingsView',
    image: require("./settings.png"),
  },
  
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Logout',
    destination: 'Login',
    image: require("./logout.png"),
  },
]
const CalendarView = () => {
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
      onDayPress={onDayPress}
      // markedDates={markedDates}
      markingType="period"
      markedDates={generateSchedule(scheduleList)}
    />
  );
//     return (
//   <View style={{flex:1}}>
//   <View style={{}}><Calendar
  
//   onDayPress={day => {
//    days=day.dateString
//    navigation.navigate("DayAgenda")
//   }}
//   onDayLongPress={day => {
//     days=day.dateString
//     console.log(day.dateString)
//    }}
//   enableSwipeMonths={true}
// markingType={'custom'}
// // markedDates={{
// // '2022-03-28': {
// //   customStyles: {
// //     container: {
// //       backgroundColor: 'green'
// //     },
// //     text: {
// //       color: 'black',
// //       fontWeight: 'bold'
// //     }
// //   }
// // },
// // '2022-03-29': {
// //   customStyles: {
// //     container: {
// //       backgroundColor: 'white',
// //       elevation: 2
// //     },
// //     text: {
// //       color: 'blue'
// //     }
// //   }
// // }
// // }}
// />
// </View>

// </View>
      
//     );
}

// '2022-01-21': {
//   startingDay: true, 
//   color: '#50cebb', textColor: 
//   'white'
// },


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
        scheduleObj.color = '#50cebb';
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
  console.log('DatesList', dates);
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
