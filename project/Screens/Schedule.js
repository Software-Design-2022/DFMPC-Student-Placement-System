import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/core'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Linking,
} from 'react-native';

const Schedule = () => {
  const navigation =useNavigation()
  const [name, SetName] = useState('');
  return (
    <>
    <Text></Text>
    <View style={styles.button}>
      <Button  title='Dashboard' onPress={()=>{navigation.navigate("Dashboard")}}></Button>
    </View>
    <View style={styles.button}>
      <Button  title='Calendar' onPress={()=>{navigation.navigate("Calendar")}}></Button>
    </View>
    <View style={styles.button}>
       <Button title='Logout' onPress={()=>{navigation.navigate("Login")}}></Button>
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

export default Schedule;