import React, { useState, useRef, useEffect, Component } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Pressable,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  Button,
  ScrollView,
  Linking,
  LogBox
} from "react-native";
const { width, height } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import "./global";
import PropTypes from "prop-types";
import { WebView } from "react-native-webview";
import { createTopBar } from "../HelperFunctions";
import { getList } from "./notificationHelper";

//Constants for use with UI scaling
const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 33;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 4;
//data to be displayed in the flatlist

const DATA2 = notificationList;

// creates it so each item has a touchable button with correct title

const Notifications = () => {
  // console.log(notificationList);

  // get notifications from database
  const [state, setState] = useState({
    notifications: [],
  });
  const onReceive = (notifications) => {
    setState((prevState) => ({
      notifications: (prevState.notifications = notifications),
    }));
  };
  getList(onReceive);
  LogBox.ignoreLogs(["Setting a timer"]);
  //console.log(state.notifications)

  const scrollY = React.useRef(new Animated.Value(0)).current;
  //use navigation
  const navigation = useNavigation();
  //change colour of tapped button
  const [selectedId, setSelectedId] = useState(null);
  const [name, SetName] = useState("");
  // first render function that renders the vertical flatlist
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item.link);
        }}
      >
        <View
         key={item.time}
          style={{
            height: 100,
            backgroundColor: "rgba(9,38,66,0.75)",
            marginBottom: 10,
            margin: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              borderBottomWidth: 2,
              borderColor: "rgba(255,255,255,255)",
              letterSpacing: 1,
              fontWeight: "bold",
              left: 4,
              top: 2,
              color: "rgba(255,255,255,255)",
              position: "absolute",
              fontSize: 20,
            }}
          >
            {item.heading}
          </Text>
          <Text
            style={{
              letterSpacing: 1,
              fontWeight: "bold",
              right: 4,
              top: 2,
              color: "rgba(255,255,255,255)",
              position: "absolute",
              fontSize: 10,
            }}
          >
            {item.date}
          </Text>
          <Text
            style={{
              letterSpacing: 1,
              fontWeight: "bold",
              right: 4,
              top: 14,
              color: "rgba(255,255,255,255)",
              position: "absolute",
              fontSize: 10,
            }}
          >
            {item.time}
          </Text>
          <Text
            style={{
              letterSpacing: 0,
              fontWeight: "bold",
              left: 4,
              top: SPACING + 12,
              color: "rgba(128,185,238,255)",
              height: 50,
              width: width / 1.1,
            }}
          >
            {item.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {createTopBar(10, navigation, false)}
      <View style={{ flex: 1, zIndex: 1, top: 15 }}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 10,
              textAlign: "center",
              fontSize: 20,
              padding: 2,
              marginLeft: 5,
              color: "black",
            }}
          >
            ALL
          </Text>
          <Text
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 10,
              textAlign: "center",
              fontSize: 20,
              padding: 2,
              marginLeft: 5,
              color: "black",
            }}
          >
            EVENTS
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          contentContainerStyle={{}}
          data={state.notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ position: "absolute" }}>
        <Image
          resizeMode="contain"
          source={require("./images/background.png")}
          blurRadius={0}
        />
      </View>
    </View>
  );
};

export default Notifications;
