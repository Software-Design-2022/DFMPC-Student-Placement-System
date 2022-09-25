import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import { getList } from "./ListApi";

const EmergencyProtocols = () => {
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
    marginTop: 50,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    padding: 10,
  },
  item: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "rgba(192,192,192,0.2)",
    padding: 10,

    marginTop: 10,
    marginBottom: 10,
    marginRight: 2,
    marginLeft: 2,
    borderWidth: 2,
    borderColor: "rgba(192,192,192,0.3)",
  },
  itemshow: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "rgba(63, 130, 109,0.2)",
    padding: 10,

    marginTop: 10,
    marginBottom: 10,
    marginRight: 2,
    marginLeft: 2,
    borderWidth: 2,
    borderColor: "rgba(192,192,192,0.3)",
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
    color: "rgb(36, 123, 160)",
  },
  inneritem: {
    borderRadius: 5,
    backgroundColor: "rgba(181, 177, 178,0.2)",
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "rgba(192,192,192,0.3)",
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
    backgroundColor: "rgba(221, 240, 255,0.2)",
    color: "black",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    opacity: 1,
    maxHeight: 9999,
  },
});
export default EmergencyProtocols;
