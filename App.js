import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Schedule from "./Screens/Schedule";
import Calendar from "./Screens/Calendar";
import SettingsView from "./Screens/Settings";
import "./global.js";
import { TouchableHighlight, TouchableOpacity } from "react-native-web";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({ navigation }) => ({
            headerTitle: "Dashboard",
            headerRight: () => (
              // wrapping image in Touchables causes error "View config getter callback for component `div` must be a function"
              <>
                <Image
                  style={styles.tinyProfilePic}
                  source={{ uri: authUserProfilePic }}
                />
                <Button
                  title="settings"
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("SettingsView");
                  }}
                />
              </>
            ),
          })}
        />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="SettingsView" component={SettingsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyProfilePic: {
    width: 45,
    height: 45,
    borderRadius: 50,
    margin: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "darkcyan",
  },
});
export default App;
