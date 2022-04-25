import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/core'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Button,
  Linking,
  ImageBackground,
} from 'react-native';


const image = { uri: "https://reactjs.org/logo-og.png" };

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#7CA1B4',
    paddingTop: 50,
  },
  stretch: {
    width: 100,
    height: 200,
    resizeMode: 'stretch',
  },
});

const BackgroundTest = () => {
  const navigation =useNavigation()
  const [name, SetName] = useState('');
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={image}
      />
    </View>
  );
};





export default BackgroundTest;