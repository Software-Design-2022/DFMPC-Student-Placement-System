import React, { useState } from "react";
import {
  requireNativeComponent,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import GetLocation from "react-native-get-location";
const Separator = () => <View style={styles.separator} />;

const PanicButton = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Protocols"
          onPress={() => navigation.navigate("Protocols")}
        />
      </View>
      <Separator />
    
      <View 
      style={{ padding: 10 }}>
            <TextInput
              style={{ height: 40 }}
              placeholder="Type emergency message here!"
              onChangeText={(newText) => setText(newText)}
              defaultValue={text}
            />
           
          </View>
          <Separator />
          <View>
        <Button title="Send Emergency message" color="#f194ff"
         />


      </View>
      <Separator />
      <View>
        <View>
          <Button
            title="Record Emergency"
            onPress={() => navigation.navigate("VoiceRecorder")}
          />
          
        </View>
      </View>
      <Separator />
      <View style={styles.MapStyle}>
        <MapView
          style={styles.map}
          region={{
            latitude: -26.18471,
            longitude: 28.026791,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        ></MapView>
        <Marker
          coordinate={{
            latitude: -26.18471,
            longitude: 28.026791,
          }}
          // image={{uri:"./images/pin.png"}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  MapStyle: {
    flex: 1,
    margin: 20,
    marginBottom: 90,

    justifyContent: "center",
  },
});

export default PanicButton;
