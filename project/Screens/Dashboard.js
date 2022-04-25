import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/core'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Linking,
  ImageBackground,
} from 'react-native';

const Dashboard = () => {
  const navigation =useNavigation()
  const [name, SetName] = useState('');
  return (

    <>
    <View>
      <View style={styles.button}>
      <Button  title='Schedules' onPress={()=>{navigation.navigate("Schedule")}}></Button>
    </View>
    <View style={styles.button}>
       <Button  title='Logout' onPress={()=>{navigation.navigate("Login")}}></Button>
      </View>
      <View style={styles.button}>
       <Button  title='BackgroundTest' onPress={()=>{navigation.navigate("BackgroundTest")}}></Button>
      </View>
      </View>
     </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'darkcyan',
  },
  text: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default Dashboard;