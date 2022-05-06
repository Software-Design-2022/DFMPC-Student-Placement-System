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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        /> }
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="CalendarView" component={CalendarView} />
        <Stack.Screen name="SettingsView" component={SettingsView} />
        <Stack.Screen name="Protocols" component={Protocols} />
        <Stack.Screen name="DayAgenda" component={DayAgenda} />
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
});
export default App;
