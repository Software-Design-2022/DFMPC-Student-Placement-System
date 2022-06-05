import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getList } from "./ListApi";

const Protocols = () => {
  // this useState will be used to set the current state of our data
  // sets protocolList to the dat from database (firestore)
  const [state, setState] = useState({
    protocolList: [
      {
        key: 0,
        Protocol: "",
        content: "",
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {
            // map is Calls a defined callback function on each element of an array,
            //and returns an array that contains the results.
            // with the {+,-} we toggle between the two depending on which one is currently selected
            state.protocolList.map((item, key) => (
              <View key={protocolList.Protocol}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => toggle(key)}
                >
                  <Text style={styles.itemText}>{item.Protocol}</Text>
                  <Text style={styles.itemText}>
                    {selected === key ? "-" : "+"}
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    selected === key ? styles.content_show : styles.contentHide
                  }
                >
                  <Text style={{ color: "white" }}>{item.content}</Text>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(18,33,65,0.8)",
  },
  header: {
    flexDirection: "row",
    padding: 10,
  },
  item: {
    backgroundColor: "rgba(18,33,65,0.8)",
    padding: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  contentHide: {
    color: "white",
    backgroundColor: "rgba(44,59,92,255)",
    overflow: "hidden",
    maxHeight: 0,
  },
  content_show: {
    color: "white",
    backgroundColor: "rgba(44,59,92,255)",
    marginBottom: 10,
    marginTop: 10,
    padding: 30,
    opacity: 1,
    maxHeight: 9999,
  },
});
export default Protocols;
