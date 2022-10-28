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
import Notifications from "./Screens/Notifications";
import SnazzyLogin from "./Screens/SnazzyLogin";
import EventsCalendar from "./Screens/EventsCalendar";
import { Doctors } from "./Screens/Doctors";
import LoginMicrosoft from "./Screens/LoginMicrosoft";

/**
 * @constant Stack - The navigation stack
 * @description This is the navigation stack that will be used to navigate between screens.
 * @see https://reactnavigation.org/docs/native-stack-navigator for official documentation of the navigation stack.
 */
const Stack = createNativeStackNavigator();

/**
 *
 * @module App - The Main App Component
 * @description This is the main file for the application. It contains the navigation stack and the main screen. It will
 *             render the main screen and the navigation stack.
 *
 * @see Github: @CallumMuller @Cipher73 @nokuthabam @peacendlovu @shgnplaatjies
 * @see https://reactnavigation.org/docs/native-stack-navigator/
 *
 * @author - Callum Muller, Shagan Plaatjies, Angela Nkosi, Nokuthaba Moyo, Peace Riot Ndlovu
 * @version 0.2.4 - 2022/10/27 - Sprint 4/4 of version 0.2
 */
function App() {
  // This is the main function that will be called when the app is loaded
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={SnazzyLogin}
          />
        }

        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doctors"
          component={Doctors}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginMicrosoft"
          component={LoginMicrosoft}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CalendarView"
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
        <Stack.Screen
          name="DayAgenda"
          component={DayAgenda}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmergencyPage"
          component={EmergencyPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventsCalendar"
          component={EventsCalendar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="snazzyLogin"
          component={SnazzyLogin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * @constant styles - The styles for the main screen
 * @description This is the stylessheet for the navigation stack. It contains the styles for the main screen.
 * @see https://reactnative.dev/docs/stylesheet for official documentation of stylesheets.
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
