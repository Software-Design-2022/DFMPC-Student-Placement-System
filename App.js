import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Schedule from "./Screens/Schedule";
import Calendar from "./Screens/Calendar";
import Settings from "./Screens/Settings";
import { ScreenStackHeaderRightView } from "react-native-screens";
import { Button } from "react-native-web";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen options={{headerShown:false}} name="Login" component={Login} /> */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Settings" component={Settings} />
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
