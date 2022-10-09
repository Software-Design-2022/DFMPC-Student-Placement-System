import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { IconButton, Portal } from "react-native-paper";
import "../global";


const { width, height } = Dimensions.get("screen");
const SPACING = 20;
const ICON_SIZE = 75;

const BottomSheet = (show, onDismiss, eventsInfo1) => {
  const sheetHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [open, setOpen] = useState(show);
  const bottom = useRef(new Animated.Value(-sheetHeight)).current;

  // const [eventsData,setEventsData] =useState([{}])
  //setEventsData(eventsInfo)
  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: -300,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -sheetHeight,
        duration: 100,
        useNativeDriver: false,
      }).start(() => setOpen(false));
    }
  }, [show]);
  if (open == false) {
    return null;
  }

  return (
    <Portal>
      <Animated.View
        style={[
          styles.root,
          {
            height: sheetHeight,
            bottom: bottom,
            shadowOffset: {
              height: -3,
            },
          },
          styles.common,
        ]}
      >
        <View
          style={[
            styles.header,
            styles.common,
            { shadowOffset: { height: 3 } },
          ]}
        >
          <View
            style={{
              width: 60,
              height: 3,
              borderRadius: 1.5,
              position: "absolute",
              top: 8,
              left: (screenWidth - 60) / 2,
              zIndex: 10,
              backgroundColor: "#ccc",
            }}
          />
          <IconButton
            color="red"
            icon="close"
            style={styles.closeIcon}
            onPress={() => setOpen(false)}
            
          />
        </View>
        <View>
          {eventData.map((item, key) => (
            <View key={key} style={[styles.item, { height: item.height}]}>
              <Text>{item.name}</Text>
              <Text>{item.programme}</Text>
              <Text>{item.start}</Text>
              <Text>{item.end}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </Portal>
  );
};
var styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "rgba(28,56,107,0.9)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },

  header: {
    height: 44,
    backgroundColor: "#fff",
  },
  common: {
    shadowColor: "#000",
    // backgroundColor:"pink",
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  item: {
    backgroundColor: "white",
  
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
   
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width / 2,
    height: height / 3,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    bottom: -height / 5,
  },
  buttonClose: {
    backgroundColor: "black",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default BottomSheet;
