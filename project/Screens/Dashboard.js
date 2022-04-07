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

const Dashboard = () => {
  const navigation =useNavigation()
  const [name, SetName] = useState('');

  return (
    <><View style={styles.body1}>
      <Text style={styles.text}>
        Please write your name:
      </Text>
      <TextInput
        style={styles.input}
        placeholder='e.g. John'
        onChangeText={(value) => SetName(value)} />
      <Text style={styles.text}>
        Your name is: {name}
      </Text>
      <View style={styles.body2}>
      <Text style={styles.text2}>Button</Text>
      <Button title='Press me' onPress={()=>{navigation.navigate("Login")}}></Button>
    </View>
    </View><View style={styles.body}>
        <View style={styles.view1}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text}>3</Text>
        </View>
      </View></>
  );
};

const styles = StyleSheet.create({
  body1: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0000ff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  view1: {
    flex: 1,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {
    flex: 1,
    backgroundColor: '#ff00ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view3: {
    flex: 1,
    backgroundColor: '#ffff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
  body2: {
    width:5000,
    flex: 1,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text2: {
    color: '#ffffff',
    fontSize: 20,
    fontStyle:'italic',
    margin: 10,
  },
  input: {
    width: 500,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Dashboard;