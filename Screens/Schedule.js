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

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 260;

const Schedule = () => {
  const navigation = useNavigation();
  const [name, SetName] = useState("");

  return (
    <>
      <View style={{width:"100%",flex:1,}}>
      <LinearGradient colors={['rgba(30,55,108,1)', ' rgba(30,55,108,0.8)', 'rgba(30,55,108,1)']} >
      <TouchableOpacity
            onPress={()=>{navigation.navigate("CalendarView")}}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>Calendar</Text>

        </TouchableOpacity> 
    </LinearGradient>
      </View>
      <View style={{width:"100%",flex:1,}}>
      <LinearGradient colors={['rgba(30,55,108,1)', ' rgba(30,55,108,0.8)', 'rgba(30,55,108,1)']} >
      <TouchableOpacity
            onPress={()=>{navigation.navigate("Login")}}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>Logout</Text>

        </TouchableOpacity> 
    </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: AVATAR_SIZE,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    
  },
  buttonText: {
    fontSize: AVATAR_SIZE/3,
    fontWeight:'700',
    textAlign: 'center',
    color: ' rgba(128,163,198,0.8)',
    backgroundColor: 'transparent',
    height:AVATAR_SIZE,
    paddingTop:AVATAR_SIZE/4
  },
});

export default Schedule;
