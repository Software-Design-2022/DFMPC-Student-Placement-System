import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Schedule from "./Screens/Schedule";
import CalendarView from "./Screens/CalendarView";
import SettingsView from "./Screens/Settings";
import EmergencyProtocols from "./Screens/EmergencyProtocols";
import DayAgenda from "./Screens/DayAgenda";
import EmergencyPage from "./Screens/EmergencyPage";

import EventsCalendar from "./Screens/EventsCalendar";

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
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Schedule" 
        component={Schedule}
        options={{ headerShown: false }}
         />
        <Stack.Screen name="CalendarView"
         component={CalendarView}
         options={{ headerShown: false }}
          />
        <Stack.Screen
          name="SettingsView"
          component={SettingsView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmergencyProtocols"
          component={EmergencyProtocols}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DayAgenda" component={DayAgenda}
         options={{ headerShown: false }}
          />
        <Stack.Screen name="EmergencyPage" component={EmergencyPage}
         options={{ headerShown: false }}
         />
        <Stack.Screen name="EventsCalendar" component={EventsCalendar}
         options={{ headerShown: false }}
         />
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
