
import {
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import React, { useState } from 'react';

const SPACING = 20;
const ICON_SIZE = 33;
const { width, height } = Dimensions.get("screen");

export const multiply = (a, b) => {
  return a * b;
};

export const makeLowerCase = (string) => {
  return string.toLowerCase();
};

export function getCurrentDate()
{
  const today = new Date();
  const day = today.getDate();       
  const month = today.getMonth();     
  const year = today.getFullYear();
  
  return day + "-" + month + "-" + year;
}

// export function createTopBar(T,R,color,navigation){
//   return(
//   <View
//         style={{
//           backgroundColor: color,
//           height: ICON_SIZE,
//           zIndex: 1,
//           top: T,
//           borderRadius: 100,
//           right: R,
//           width: width / 1,
//         }}
//       >
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0.0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE,
//             height: ICON_SIZE,
//             right: 10,
//             top: 2,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//           }}
//           onPress={() => {
//             navigation.navigate("Login");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               borderWidth: 2,
//             }}
//             source={require("./Screens/images/logout_logo.png")}
//           />
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE,
//             height: ICON_SIZE,
//             right: ICON_SIZE + 20,
//             top: 0,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//             marginBottom: SPACING / 2,
//           }}
//           onPress={() => {
//             navigation.navigate("EmergencyPage");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               shadowRadius: 20,
//             }}
//             source={require("./Screens/images/emergency.png")}
//           />
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE,
//             height: ICON_SIZE,
//             right: ICON_SIZE * 2 + 30,
//             top: 0,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//             marginBottom: SPACING / 2,
//           }}
//           onPress={() => {
//             navigation.navigate("SettingsView");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               shadowRadius: 20,
//             }}
//             source={require("./Screens/images/bell.png")}
//           />
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE / 1.1,
//             height: ICON_SIZE / 1.1,
//             right: ICON_SIZE * 3 + 40,
//             top: 2,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//             marginBottom: SPACING / 2,
//           }}
//           onPress={() => {
//             navigation.navigate("SettingsView");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE / 1.1,
//               height: ICON_SIZE / 1.1,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               shadowRadius: 20,
//             }}
//             source={{ uri: authUserProfilePic }}
//           />
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0.0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE/1,
//             height: ICON_SIZE/1,
//             right:  ICON_SIZE * 5 + 50,
//             top: 0,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//           }}
//           onPress={() => {
//             navigation.goBack();
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               borderWidth: 2,
//             }}
//             source={require("./Screens/images/back.png")}
//           />
//         </TouchableHighlight>
//       </View>
//   )
// }


export function createTopBar(T,navigation){
  const [shouldShow, setShouldShow] = useState(true);
  return(
    <View style={{flex:0.07,zIndex:1,backgroundColor:'white',top:40,right:0}}>
      <View>
      <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE/1,
            height: ICON_SIZE/1,
            right:  SPACING,
            top: T,
            position: "absolute",
            borderRadius: ICON_SIZE,
          }}
          onPress={() => {
            setShouldShow(!shouldShow);
          }}
        >
          <Image
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
              borderWidth: 2,
            }}
            source={require("./Screens/images/menu.png")}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE/1,
            height: ICON_SIZE/1,
            left:  SPACING/2,
            top: T,
            position: "absolute",
            borderRadius: ICON_SIZE,
          }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
              borderWidth: 2,
            }}
            source={require("./Screens/images/back.png")}
          />
        </TouchableHighlight>
        </View>
        {shouldShow ?
        (
        <View>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE/1,
            height: ICON_SIZE/1,
            right:  SPACING+(ICON_SIZE+10),
            top: T,
            position: "absolute",
            borderRadius: ICON_SIZE,
          }}
          onPress={() => {
            navigation.navigate("SettingsView");
          }}
        >
          <Image
            style={{
              width: ICON_SIZE/1,
            height: ICON_SIZE/1,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
              borderWidth: 2,
            }}
            source={{ uri: authUserProfilePic }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE/1,
            height: ICON_SIZE/1,
            right:  SPACING+(ICON_SIZE+10)*2,
            top: T,
            position: "absolute",
            borderRadius: ICON_SIZE,
          }}
          onPress={() => {
            navigation.navigate("EmergencyPage");
          }}
        >
          <Image
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
              borderWidth: 2,
            }}
            source={require("./Screens/images/emergency.png")}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE/1,
            height: ICON_SIZE/1,
            right:  SPACING+(ICON_SIZE+10)*3,
            top: T,
            position: "absolute",
            borderRadius: ICON_SIZE,
          }}
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <Image
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
              borderWidth: 2,
            }}
            source={require("./Screens/images/home.png")}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE/1,
            height: ICON_SIZE/1,
            right:  SPACING+(ICON_SIZE+10)*4,
            top: T+2,
            position: "absolute",
            borderRadius: ICON_SIZE,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Image
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
              borderWidth: 2,
            }}
            source={require("./Screens/images/logout_logo.png")}
          />
        </TouchableHighlight>
        </View>
        ):null}
        </View>
  )
}

