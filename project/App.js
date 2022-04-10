Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@nokuthabam 
Software-Design-2022
/
DFMPC-Student-Placement-System
Private
Code
Issues
1
Pull requests
1
Actions
Projects
1
Security
2
Insights
Settings
We found potential security vulnerabilities in your dependencies.
You can see this message because you have been granted access to Dependabot alerts for this repository.

DFMPC-Student-Placement-System/project/App.js /
@peacendlovu
peacendlovu Update App.js
Latest commit fc8a677 yesterday
 History
 6 contributors
@peacendlovu@CallumMuller@shgnplaatjies@Mtho-hub@Cipher73@nokuthabam
33 lines (28 sloc)  933 Bytes
   
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Screens/Login'
import Dashboard from './Screens/Dashboard'
import Schedule from './Screens/Schedule'

const Stack = createNativeStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Schedule" component={Schedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete