import React,  { useState } from 'react';
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

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
var days=""

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
  const [selectedId, setSelectedId] = useState(null);
  const [name, SetName] = useState('');
  const navigation = useNavigation()
  const setwords = ({word}) => {
    words=word
  }
    return (
  <View style={{flex:1}}>
  <View style={{}}><Calendar
  
  onDayPress={day => {
   days=day.dateString
   navigation.navigate("DayAgenda")
  }}
  onDayLongPress={day => {
    days=day.dateString
    console.log(day.dateString)
   }}
  enableSwipeMonths={true}
markingType={'custom'}
markedDates={{
'2022-03-28': {
  customStyles: {
    container: {
      backgroundColor: 'green'
    },
    text: {
      color: 'black',
      fontWeight: 'bold'
    }
  }
},
'2022-03-29': {
  customStyles: {
    container: {
      backgroundColor: 'white',
      elevation: 2
    },
    text: {
      color: 'blue'
    }
  }
}
}}
/>
</View>

</View>
      
    );
}

    
  
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
