import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getList } from "./ListApi"; // import listapi module

const Protocols = () => {
  const [state, setState] = useState({
    protocolList: [
      {
        // set state for list
        key: 0,
        Protocol: "", // set key and protocol
        content: "",
      },
    ],
  }); // set content

  const onReceive = (protocolList) => {
    // on receive function

    setState((prevState) => ({
      // set state for list
      protocolList: (prevState.protocolList = protocolList), // set list for protocol
    }));
  };
  getList(onReceive); // get list from listapi module

  const [selected, setSelected] = useState(null); // set state for selected

  const toogle = (i) => {
    // toogle function
    if (selected == i) {
      // if selected is equal to i
      return setSelected(null); // set selected to null
    }
    setSelected(i); // set selected to i
  };

  return (
    // SafeAreaView for android
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {
            // map function for list
            state.protocolList.map((item, key) => (
              <View>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => toogle(key)}
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

// styles for screen

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
