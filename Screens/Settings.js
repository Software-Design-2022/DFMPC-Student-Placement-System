import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Linking,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
} from "react-native";
import { Alert } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 260;

const DATA=[
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Change Profile Photo',
    text: "TODO:, Update User' profile_photo url in Firebase.",
    method: {setProfilePhoto}
  },
  {
    id: '2',
    title: 'Change App Theme',
    text: "TODO:, Update User' profile_photo url in Firebase.",
  },
  {
    id: '3',
    title: 'Suggestions?',
    text: "TODO:, Update User' profile_photo url in Firebase.",
  },
];
const Settings = () => {
  const navigation = useNavigation();
  const [name, SetName] = useState("");
  const renderItem = ({ item }) => {

    
    return (
    <View style={{flexDirection: 'column',
    
    flex:1,
    borderRadius:8,
    marginBottom:SPACING,
    shadowColor:"rgba(0,0,0,1)",
    shadowOffset:{
      width: 0,
      height:10,
    },
    paddingTop:SPACING,
    shadowOpacity:1,
    shadowRadius:10,
    }}>
      <View style={{width:"100%",flex:1,}}>
      <LinearGradient colors={['rgba(30,55,108,1)', ' rgba(30,55,108,0.8)', 'rgba(30,55,108,1)']} >
      <TouchableOpacity
            onPress={()=>{Alert.alert(item.text)}}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>{item.title}</Text>

        </TouchableOpacity> 
    </LinearGradient>
      </View>
      </View>
    );
    
  };
  return (
    <>
    <View style={styles.container}>
      <Image 
       style={{width:ICON_SIZE,
        height:ICON_SIZE,
        resizeMode: 'cover',
                right: 0,
                top: 10,
        borderRadius:ICON_SIZE
        ,marginRight:SPACING/2,
        borderWidth:10,
        borderColor:"rgba(200,200,200,1)",
        backgroundColor:"white",
      shadowOffset:{
      height:10,
      shadowColor:'black',
      flex:1

      },
       shadowOpacity:1,
      shadowRadius:10,
        }}
        source={require("./bear.gif")}
        />
        <View style={{flex:2, marginTop:25,width:"100%",backgroundColor:"rgba(30,55,108,1)"}}>
      <FlatList contentContainerStyle={{
      }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
        
        
        
        </View>
    
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(28,56,107,255)",
    width:"100%",
  },
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

export default Settings;
