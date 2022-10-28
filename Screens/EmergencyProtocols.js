import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Image,
  Dimensions,
} from "react-native";
import { getList } from "./ListApi";
import { useNavigation } from "@react-navigation/core";
import { createTopBar } from "../HelperFunctions";
const { width, height } = Dimensions.get("screen");
const EmergencyProtocols = () => {
  const navigation = useNavigation();
  // this useState will be used to set the current state of our data
  // sets protocolList to the dat from database (firestore)
  const [state, setState] = useState({
    protocolList: [
      {
        key: 0,
        Protocol: "",
        content: [""],
      },
    ],
  });

  const onReceive = (protocolList) => {
    // when the list is received we set our protocolLIst to the current received list (updating)
    setState((prevState) => ({
      protocolList: (prevState.protocolList = protocolList),
    }));
  };
  // getList is a function from LIstApi.js
  // it gets the list containing data from firestore
  getList(onReceive);

  // this will allow the app to know which on the Views containg the data is clicked
  // we need to keep track of what is currently selected
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <View style={{ flex: 1 }}>
      {createTopBar(10, navigation)}
      <View style={{ position: "absolute" }}>
        <Image
          resizeMode="contain"
          source={require("./images/background.png")}
          blurRadius={0}
        />
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {
            // map is Calls a defined callback function on each element of an array,
            //and returns an array that contains the results.
            // with the {+,-} we toggle between the two depending on which one is currently selected
            state.protocolList.map((item, key) => (
              <View key={item.Protocol}>
                <TouchableOpacity
                  onPress={() => toggle(key)}
                  style={selected === key ? styles.itemshow : styles.item}
                >
                  <Text
                    style={
                      selected === key ? styles.toggleshow : styles.togglehide
                    }
                  >
                    {selected === key ? "-" : "+"}
                  </Text>
                  <Text
                    style={
                      selected === key ? styles.itemTextshow : styles.itemText
                    }
                  >
                    {item.Protocol}{" "}
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    selected === key ? styles.content_show : styles.contentHide
                  }
                >
                  {item.content.map((data, key) => (
                    <View style={styles.inneritem} key={data}>
                      <Text style={styles.inneritemText}>{data}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
    flex: 1,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    padding: 10,
  },
  item: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,1)",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 0,
    marginLeft: 0,
    borderWidth: 2,
    borderColor: "rgba(192,192,192,0.7)",
    width: width-30,
  },
  itemshow: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255,0.9)",
    padding: 10,
    borderRadius:20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 2,
    marginLeft: 2,
    borderWidth: 4,
    borderColor: "rgba(128,0,0,1)",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },

  toggleshow: {
    start: 0,
    marginRight: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "rgb(192, 50, 33)",
  },
  togglehide: {
    start: 0,
    marginRight: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "rgb(241, 80, 37)",
  },

  itemTextshow: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgb(0, 0, 0)",
    textAlign: "center",
  },
  inneritem: {
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255,1)",
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius:20,
  },
  inneritemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  contentHide: {
    color: "black",
    backgroundColor: "rgb(216, 212, 213)",
    overflow: "hidden",
    maxHeight: 0,
  },
  content_show: {
    backgroundColor: "rgba(221, 240, 255,0.7)",
    color: "black",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    opacity: 1,
    maxHeight: 9999,
    borderRadius:20,
  },
});
export default EmergencyProtocols;
