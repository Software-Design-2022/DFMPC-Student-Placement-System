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
import LoginMicrosoft from "./Screens/LoginMicrosoft";



const Stack = createNativeStackNavigator();

// function ProfileContent() {
//   const { instance, accounts } = useMsal();
//   const [graphData, setGraphData] = useState(null);

//   const name = accounts[0] && accounts[0].name;

//   function RequestProfileData() {
//       const request = {
//           ...loginRequest,
//           account: accounts[0]
//       };

//       // Silently acquires an access token which is then attached to a request for Microsoft Graph data
//       instance.acquireTokenSilent(request).then((response) => {
//           callMsGraph(response.accessToken).then(response => setGraphData(response));
//       }).catch((e) => {
//           instance.acquireTokenPopup(request).then((response) => {
//               callMsGraph(response.accessToken).then(response => setGraphData(response));
//           });
//       });
//   }

//   return (
//       <>
//           <h5 className="card-title">Welcome {name}</h5>
//           {graphData ? 
//               <ProfileData graphData={graphData} />
//               :
//               <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
//           }
//       </>
//   );
// };

// function App() {
//   return (
//       <PageLayout>
//           <AuthenticatedTemplate>
//               <ProfileContent />
//           </AuthenticatedTemplate>
//           <UnauthenticatedTemplate>
//               <p>You are not signed in! Please sign in.</p>
//           </UnauthenticatedTemplate>
//       </PageLayout>
//   );
// }
function App() {
  // This is the main function that will be called when the app is loaded
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginMicrosoft}
          />
        }
        
        <Stack.Screen
          name="Schedule"
          component={Schedule}
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
