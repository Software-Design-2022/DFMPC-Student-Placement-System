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

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 260;

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
  getSchedule(onReceive)
  console.log(state.scheduleList)
  const navigation = useNavigation();


  return (

    <Text>asa</Text>
     );
};

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
