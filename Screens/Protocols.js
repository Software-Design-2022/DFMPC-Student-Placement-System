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
    setState((prevState) => ({
      protocolList: (prevState.protocolList = protocolList),
    }));
  };
  getList(onReceive);

  const [selected, setSelected] = useState(null);

  const toogle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {state.protocolList.map((item, key) => (
            <View>
              <TouchableOpacity style={styles.item} onPress={() => toogle(key)}>
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
          ))}
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
