import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/core'
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity,TouchableHighlight, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import {LinearGradient} from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';



const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
const image = { uri: "https://reactjs.org/logo-og.png" };

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Schedule',
    destination: 'Schedule',
    image: require("./task.png"),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Logout',
    destination: 'Login',
    image: require("./house.png"),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Calendar',
    destination: 'Calendar',
    image: require("./calendar.png"),
  },
  {
    id: '38694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Assignments',
    destination: 'BackgroundTest',
    image: require("./test.png"),
  },
  
];
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);


const Dashboard = () => {
  const navigation =useNavigation()
  const [selectedId, setSelectedId] = useState(null);
  const [name, SetName] = useState('');
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#7fb4e1" : "#bcbcbc";
    const color = item.id === selectedId ? 'black' : 'black';
    return (
    <View style={{flexDirection: 'row',
    padding:SPACING,
    backgroundColor:' rgba(36,50,61,1)',
    flex:1,
    borderRadius:8,
    marginBottom:SPACING,
    shadowColor:"rgba(0,0,0,1)",
    shadowOffset:{
      width: 0,
      height:10,
    },
    shadowOpacity:0.6,
    shadowRadius:10,
    }}>
       <View>
        <Image source={item.image}
        style={{width:AVATAR_SIZE,height:AVATAR_SIZE,borderRadius:AVATAR_SIZE
        ,marginRight:SPACING/2,
        }}
        >
        </Image>
      </View>
      <View style={{width:"75%",flex:1}}>
      <LinearGradient colors={[' rgba(29,73,123,0.4)', 'rgba(29,73,123,0.7)', 'rgba(29,73,123,0.4)']} style={styles.linearGradient}>
      <TouchableOpacity
            onPress={()=>{navigation.navigate(item.destination)}}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>{item.title}</Text>

        </TouchableOpacity> 
    </LinearGradient>
      </View>
      </View>
    );
    
  };
  const renderItem2 = ({ item }) => {
    return (
    <View style={{flexDirection: 'row',
    padding:SPACING,
    flex:1,
    paddingTop:5,
    borderRadius:100,
    marginBottom:SPACING/2,
    paddingBottom:5,
    shadowColor:"rgba(0,0,0,1)",
    shadowOffset:{
      width: 0,
      height:5,
    },
    shadowOpacity:1,
    shadowRadius:20,
    }}>
       <View>
         <TouchableHighlight  onPress={()=>{navigation.navigate(item.destination)}}>

        <Image source={item.image}
        style={{width:AVATAR_SIZE/1.5,height:AVATAR_SIZE/1.5,borderRadius:AVATAR_SIZE/1.5
        }}
        >
        </Image>

        </TouchableHighlight>
        
      </View>
      </View>
    );
    
  };
  
  return (
    <View style={{flex:1, backgroundColor:' rgba(255,255,255,1)'}}>
    <View style={{ flex:1, backgroundColor:' rgba(36,50,61,1)',borderRadius:15,}}>
     <View style={{height:ICON_SIZE+10, backgroundColor:'  rgba(26,40,51,1);', borderRadius:10}}>
       <View>
     <TouchableHighlight onPress={()=>{navigation.navigate("Login")}}>
       <Image 
       style={{width:ICON_SIZE,
        height:ICON_SIZE,
        position: 'absolute',
                right: 0,
                top: 2,
        borderRadius:ICON_SIZE
        ,marginRight:SPACING/2,
        borderWidth:3,
        borderColor:"rgba(0,0,0,0.2)",
        backgroundColor:"rgba(128,163,198,1)"
        }}
        source={require("./koalaTrans.gif")}
        />
        </TouchableHighlight>
     </View>
     </View>
    <View style={{flex:1, backgroundColor:'  rgba(255,255,255,1)',borderRadius:15}}>
      <FlatList contentContainerStyle={{
        padding:SPACING/8,
        paddingTop:SPACING,

      }}
        data={DATA}
        renderItem={renderItem2}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}

      />
    </View>
    <View style={{flex:6.5, backgroundColor:' rgba(36,50,61,1)'}}>
      <FlatList contentContainerStyle={{
        padding:SPACING/8,
        paddingTop:SPACING/4,

      }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
    </View>
    <View>
     <TouchableHighlight onPress={()=>{navigation.navigate("Login")}}>
       <Image 
       style={{width:ICON_SIZE,
        height:ICON_SIZE,
        position: 'absolute',
                right: 0,
                bottom: 0,
        borderRadius:ICON_SIZE
        ,marginRight:SPACING/2,
        }}
        source={require("./panic.gif")}
        />
        </TouchableHighlight>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#7fb4e1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  ButtonStyle:{
    height:AVATAR_SIZE
    },
  linearGradient: {
    height: AVATAR_SIZE,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: AVATAR_SIZE/2,
    fontWeight:'700',
    textAlign: 'center',
    color: ' rgba(128,163,198,0.8)',
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