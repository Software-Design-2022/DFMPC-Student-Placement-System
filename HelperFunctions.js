import {
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
//import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import React, { useState } from "react";

const SPACING = 20;
const ICON_SIZE = 33;
const { width, height } = Dimensions.get("screen");

export const multiply = (a, b) => {
  return a * b;
};

export const makeLowerCase = (string) => {
  return string.toLowerCase();
};

export function getCurrentDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return day + "-" + month + "-" + year;
}

export function createTopBar(T, navigation, show) {
  const [shouldShow, setShouldShow] = useState(false);
  var marginB = 30;
  if (Platform.OS == "ios") {
    T = T + 10;
    marginB = marginB + 10;
  }
  return (
    <View
      style={{
        height: 50,
        zIndex: 1,
        top: T + 25,
        borderBottomStartRadius: 100,
        borderTopStartRadius: 20,
        right: 0,
        width: width / 1,
        marginBottom: marginB,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <View>
        <View style={{ backgroundColor: "white" }}>
          <Image
            style={{
              backgroundColor: "rgba(255,255,255,0)",
              top: -21,
              left: 44,
              height: 100,
              width: 120,
              position: "absolute",
              resizeMode: "cover",
            }}
            source={require("./Screens/images/wits5.png")}
          />
        </View>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE / 1,
            height: ICON_SIZE / 1,
            right: SPACING,
            top: 10,
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
            }}
            source={require("./Screens/images/menu.png")}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.0)"
          style={{
            flex: 1,
            width: ICON_SIZE / 1,
            height: ICON_SIZE / 1,
            left: SPACING / 2,
            top: 10,
            position: "absolute",
            borderRadius: ICON_SIZE,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: "absolute",
              resizeMode: "cover",
              borderRadius: ICON_SIZE,
            }}
            source={require("./Screens/images/back.png")}
          />
        </TouchableHighlight>
      </View>
      {shouldShow ? (
        <View>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.0)"
            style={{
              flex: 1,
              width: ICON_SIZE / 1,
              height: ICON_SIZE / 1,
              right: SPACING + (ICON_SIZE + 8),
              top: 10,
              position: "absolute",
              borderRadius: ICON_SIZE,
            }}
            onPress={() => {
              navigation.navigate("SettingsView");
            }}
          >
            <Image
              style={{
                width: ICON_SIZE / 1,
                height: ICON_SIZE / 1,
                position: "absolute",
                resizeMode: "cover",
                borderRadius: ICON_SIZE,
              }}
              source={{ uri: authUserProfilePic }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.0)"
            style={{
              flex: 1,
              width: ICON_SIZE / 0.9,
              height: ICON_SIZE / 0.9,
              right: SPACING + (ICON_SIZE + 7) * 2,
              top: 9,
              position: "absolute",
              borderRadius: ICON_SIZE,
            }}
            onPress={() => {
              navigation.navigate("EmergencyPage");
            }}
          >
            
            <Image
              style={{
                width: ICON_SIZE / 0.9,
                height: ICON_SIZE / 0.9,
                position: "absolute",
                resizeMode: "cover",
              }}
              source={require("./Screens/images/emergency.png")}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.0)"
            style={{
              flex: 1,
              width: ICON_SIZE / 1,
              height: ICON_SIZE / 1,
              right: SPACING + (ICON_SIZE + 8) * 3 - 2,
              top: 10,
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
              }}
              source={require("./Screens/images/home.png")}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.0)"
            style={{
              flex: 1,
              width: ICON_SIZE / 0.85,
              height: ICON_SIZE / 0.85,
              right: SPACING + (ICON_SIZE + 8) * 4 - 6,
              top: 10,
              position: "absolute",
              borderRadius: ICON_SIZE,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Image
              style={{
                width: ICON_SIZE / 0.85,
                height: ICON_SIZE / 0.85,
                position: "absolute",
                resizeMode: "cover",
                borderRadius: ICON_SIZE,
              }}
              source={require("./Screens/images/logout_logo.png")}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.0)"
            style={{
              flex: 1,
              width: ICON_SIZE / 1,
              height: ICON_SIZE / 1,
              right: SPACING + (ICON_SIZE + 8) * 5 + 7.5,
              top: -2,
              position: "absolute",
              borderRadius: ICON_SIZE,
            }}
            onPress={() => {
              navigation.navigate("Notifications");
            }}
          >
            <Image
              style={{
                width: ICON_SIZE / 0.55,
                height: ICON_SIZE / 0.55,
                position: "absolute",
                resizeMode: "cover",
                borderRadius: ICON_SIZE,
              }}
              source={require("./Screens/images/bell.png")}
            />
          </TouchableHighlight>
        </View>
      ) : null}
    </View>
  );
}


export function difference(start)
{
  let date = new Date();
  let date2 = new Date(start);
  let diff = Math.ceil((date2 - date) / (1000 * 3600 * 24));
  return diff;
}
