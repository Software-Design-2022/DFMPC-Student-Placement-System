import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/core'
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import {LinearGradient} from 'expo-linear-gradient';



const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const image = { uri: "https://reactjs.org/logo-og.png" };

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'BackgroundTest',
  },
];
const Item = ({ title }) => (
  <View style={styles.ButtonStyle}>
     <LinearGradient colors={['#1d497b', '#1d497b', '#1d497b']} style={styles.linearGradient}>
     <TouchableOpacity
            onPress={()=>{navigation.navigate(title)}}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity> 
    </LinearGradient>
    
     </View>
);

const Dashboard = () => {
  const navigation =useNavigation()
  const [name, SetName] = useState('');
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(navigation.navigate(title))}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  ButtonStyle:{
    paddingTop:15,
    width: "35%"
    },
  linearGradient: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  stretch: {
      width: 400,
      height: 200,
      resizeMode: 'stretch'
    },
  BackGround:{
    width:"100%",
    height:"100%",
    resizeMode: 'stretch',
    position: 'absolute',
    top:0 , left: 0,
    zIndex:0,
  },
  input:{
      backgroundColor:"white",
      padding:10,
      borderRadius:15,
      marginTop:10,
  },
  image: {
      flex: 1,
      justifyContent: "center"
    },
});

export default Dashboard;