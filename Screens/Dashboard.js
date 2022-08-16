import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,


} from "react-native";
const { width, height } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import "../global";

//Constants for use with UI scaling
const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
const ITEM_SIZE= AVATAR_SIZE + SPACING*3



//data to be displayed in the flatlist
const DATA = [


  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Calendar",
    destination: "CalendarView",
    image: require("./images/calendar.png"),
    text: "Calendar"
  },
  {
    id: "28694a0f-3da1-471f-bd96-145571e29d72",
    title: "Tasks",
    destination: "BackgroundTest",
    image: require("./images/tasks.png"),
    text: "Tasks"
  },
  {
    id: "18694a0f-3da1-471f-bd96-145571e29d72",
    title: "Logbook",
    destination: "BackgroundTest",
    image: require("./images/logbook.png"),
    text: "Logbook"
  },

  {
    id: "08694a0f-3da1-471f-bd96-145571e29d72",
    title: "Settings",
    destination: "SettingsView",
    image: require("./images/settings.png"),
    text: "Settings"
  },

  {
    id: "3ac68af2-c605-48d3-a4f8-fbd91aa97f63",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout.png"),
    text: "Logout"
  },
  {
    id: "4ac68af2-c605-48d3-a4f8-fbd91aa97f63",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout.png"),
    text: "Logout"
  },
  {
    id: "5ac68af2-c605-48d3-a4f8-fbd91aa97f63",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout.png"),
    text: "Logout"
  },
];



// creates it so each item has a touchable button with correct title
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const Dashboard = () => {
  const scrollY=React.useRef(new Animated.Value(0)).current;
  //use navigation
  const navigation = useNavigation();
  //change colour of tapped button
  const [selectedId, setSelectedId] = useState(null);
  const [name, SetName] = useState("");
  // first render function that renders the vertical flatlist
  

  return (
    <View style={{flex:1}}>
      <View style={{backgroundColor:'rgba(0,0,0,0.1)',
      height:40,
      zIndex:1,
      }}>
      </View>
      <View style={{backgroundColor:'rgba(255,255,255,0.8)',
      height:100,
      zIndex:1,
      borderEndWidth:0,
      borderEndColor:'rgba(255,255,255,1)', 
      borderBottomStartRadius:100,
      }}>
      <View>
      <Image 
        style={{height:80,position:'absolute',top:5,left:-50}}
        resizeMode='contain'
        source={require('./images/wits.png')}
        blurRadius={0}
      />
    </View>
      </View>
      <View style={{zIndex:1, flex:1}}>
    <Animated.FlatList
    onScroll={Animated.event(
      [{nativeEvent: {contentOffset:{y: scrollY}}}],
      {useNativeDriver:true}
    )}
    
      data={DATA}
      keyExtractor={item=>item.key}
      contentContainerStyle={{
        paddingLeft:SPACING,
        paddingTop: SPACING
      }}
      renderItem={({item,index})=>{
        const inputRange =[
          -1,
          0,
          ITEM_SIZE*index,
          ITEM_SIZE*(index+2),
        ]
        const opacityInputRange =[
          -1,
          0,
          ITEM_SIZE*index,
          ITEM_SIZE*(index+0.5),
        ]
        const scale= scrollY.interpolate({
          inputRange,
          outputRange: [1,1,1,0]
        })
        const opacity= scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1,1,1,0]
        })
        return (
          <Animated.View style={{flexDirection:'row', padding:SPACING,
           backgroundColor:'rgba(255,255,255,0.2)', borderBottomLeftRadius:0,borderTopLeftRadius:0,
            borderRadius:100,borderStartWidth:100,borderStartColor:'rgba(30,55,108,0.1)', marginBottom:SPACING/2,
            shadowColor:'black',
            shadowOffset:{
              width:0,
              height:10
            },
            opacity,
            shadowRadius:20,
            shadowOpacity:0.5,
            transform:[{scale}],
            left:-300
            }}>
              <View>
              <TouchableHighlight
              onPress={() => {
                navigation.navigate("SettingsView");
              }}
            >
              <Image
            source={item.image}
            style={{width:AVATAR_SIZE, height:AVATAR_SIZE,borderRadius:AVATAR_SIZE,
            marginRight:SPACING/2,
            left:ICON_SIZE*2+20}}
            />
            </TouchableHighlight>
              </View> 
            <Text style={{fontSize: 15, fontWeight: 'bold',color:'rgba(0,0,0,0.7)' , position: 'relative',transform:[{translateY:(-20)},{translateX:(ICON_SIZE + 5)},{rotate: '0deg'}]}}>{item.text}</Text>
          </Animated.View>
        )
          
      }}
      
      
      />
      
    </View>
    
      <View style={{position:'absolute'}}>
      <Image
        resizeMode="contain"
        source={require('./images/background.gif')}
        blurRadius={0}
      />
    </View>
    </View>
    
    
  );
};


export default Dashboard;
