import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import { days } from "./CalendarView";

//Constants to dictate side of elements in UI
const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
const image = { uri: "https://reactjs.org/logo-og.png" };
const witsLogo = {
  uri: "https://www.wits.ac.za/media/wits-university/news-and-events/images/logos-and-icons/Wits-Logo-Mono-Neg-Legal-600x300.png",
};

/**
 * @module DayAgenda
 * @description This module is the screen that displays the agenda for a specific day
 * @param {Object} props - The props passed to the component
 *
 * @returns {JSX.Element} - JSX element to render the agenda for a specific day
 */
const DayAgenda = () => {
  //Use navigation
  const navigation = useNavigation();

  //Changes button colour slightly when tapped
  /**
   * A react hook that changes the colour of the button slightly when tapped
   */
  const [selectedId, setSelectedId] = useState(null);
  /**
   * A react hook to set the button text
   */
  const [name, SetName] = useState("");
  console.log(days);

  //TO-DO, show schedules
  return (
    //main views for layout of UI
    <SafeAreaView style={{ flex: 1, backgroundColor: " rgba(255,255,255,1)" }}>
      <Text>{days}</Text>
    </SafeAreaView>
  );
};

export default DayAgenda;
