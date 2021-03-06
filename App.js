import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Schedule from "./Screens/Schedule";
import CalendarView from "./Screens/CalendarView";
import SettingsView from "./Screens/Settings";
import Protocols from "./Screens/Protocols";
import DayAgenda from "./Screens/DayAgenda";
import VoiceRecorder from "./Screens/VoiceRecorder"
import PanicButton from "./Screens/PanicButton"


const Stack = createNativeStackNavigator(); 

function App() {
  // This is the main function that will be called when the app is loaded
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        {
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
        }
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="CalendarView" component={CalendarView} />
        <Stack.Screen name="SettingsView" component={SettingsView} />
        <Stack.Screen name="Protocols" component={Protocols} />
        <Stack.Screen name="DayAgenda" component={DayAgenda} />
        <Stack.Screen name="PanicButton" component={PanicButton} />
        <Stack.Screen name="VoiceRecorder" component={VoiceRecorder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
