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
  Button,


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
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


//data to be displayed in the flatlist
const DATA = [
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Calendar",
    destination: "CalendarView",
    image: require("./images/calendarBlue.png"),
    text: "Calendar"
  },
  {
    id: "28694a0f-3da1-471f-bd96-145571e29d72",
    title: "PanicButton",
    destination: "PanicButton",
    image: require("./images/emergencyRed.png"),
    text: "Emergency"
  },
  {
    id: "18694a0f-3da1-471f-bd96-145571e29d72",
    title: "Logbook",
    destination: "BackgroundTest",
    image: require("./images/logbookPurple.png"),
    text: "Logbook"
  },

  {
    id: "08694a0f-3da1-471f-bd96-145571e29d72",
    title: "Settings",
    destination: "SettingsView",
    image: require("./images/settingsYellow.png"),
    text: "Settings"
  },

  {
    id: "3ac68af2-c605-48d3-a4f8-fbd91aa97f63",
    title: "Logout",
    destination: "Login",
    image: require("./images/logoutGreen.png"),
    text: "Logout"
  },
  {
    id: "3ac68af2-c605-48d3-a4f8-fbd91aa97f631",
    title: "Logout",
    destination: "Login",
    image: require("./images/logoutGreen.png"),
    text: "Logout"
  },
  {
    id: "2ac68af2-c605-48d3-a4f8-fbd91aa97f631",
    title: "Logout",
    destination: "Login",
    image: require("./images/logoutGreen.png"),
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
        style={{height:80,position:'absolute',top:5,left:-160}}
        resizeMode='contain'
        source={require('./images/wits.png')}
        blurRadius={0}
      />
    </View>
    <TouchableHighlight style={{flex:1,width: ICON_SIZE,
                  height: ICON_SIZE,
                  right: 10,
                  top: 10,
                  position:'absolute',
                  borderRadius: ICON_SIZE,
                  }}
              onPress={() => {
                navigation.navigate("SettingsView");
              }}
            >
              <Image
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  position: "absolute",
                  resizeMode: "cover",
                  marginRight: SPACING / 2,
                  borderRadius: ICON_SIZE,
                  borderWidth: 1.5,
                  borderColor: "rgba(0,0,0,1)",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  shadowOffset: {
                    height: 10,
                    shadowColor: "black",
                  },
                  shadowOpacity: 1,
                  shadowRadius: 20,
                }}
                source={require('./images/user.png')}
              />
      </TouchableHighlight>
      </View>
    <View style={{zIndex:1, flex:1,flexDirection:'row'}}>
    <Animated.FlatList style={{flex:1}}
    onScroll={Animated.event(
      [{nativeEvent: {contentOffset:{y: scrollY}}}],
      {useNativeDriver:true}
    )}
      data={DATA}
      keyExtractor={item=>item.key}
      contentContainerStyle={{
        paddingTop: SPACING
      }}
      renderItem={({item,index})=>{
        const inputRange =[
          -1,
          0,
          ITEM_SIZE*index,
          ITEM_SIZE*(index+1),
        ]
        const transInputRange =[
          -1,
          0,
          ITEM_SIZE*index,
          ITEM_SIZE*(index+1),
        ]
        const opacityInputRange =[
          -1,
          0,
          ITEM_SIZE*index,
          ITEM_SIZE*(index+0.8),
        ]
        const scale= scrollY.interpolate({
          inputRange,
          outputRange: [1,1,1,0]
        })
        const translated= scrollY.interpolate({
          transInputRange,
          outputRange: [1,1,1,0]
        })
        const opacity= scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1,1,1,0]
        })
        return (
          
          <TouchableHighlight style={{
          borderRadius:100,marginBottom:SPACING/2,width:ICON_SIZE+30,borderBottomEndRadius:0}}
          onPress={() => {
            navigation.navigate(item.destination);
          }}
          underlayColor='rgba(28,56,107,0.2)'
          >

          <Animated.View style={{flexDirection:'row',
           padding:SPACING,
           backgroundColor:'rgba(0,0,0,0.2))',
            borderRadius:100,
            shadowColor:'black',
            borderBottomStartRadius:0,
            borderTopStartRadius:0,
            shadowOffset:{
              width:0,
              height:10
            },
            opacity,
            transform:[{scaleX:(scale)},{scaleY:(scale)},{translateX:(translated)}],
            shadowRadius:20,
            shadowOpacity:0.5,
            width:ICON_SIZE+30,
            position:'relative',
            }}>

              <View>
              <Image
            source={item.image}
            style={{width:AVATAR_SIZE, 
            height:AVATAR_SIZE,
            borderRadius:AVATAR_SIZE,
            marginRight:SPACING/2,
            left:0,
            borderWidth:0,
            borderColor:'rgba(0,0,0,0.2)',
            backgroundColor:'rgba(0,0,0,0)' }}
            />
              </View> 
            <Text style={{fontSize: 15, fontWeight: 'bold',color:'rgba(0,0,0,0.6)'
             , position: 'absolute',
             transform:[{translateY:(0)},{translateX:(0)},{rotate: '0deg'}]}}>{item.text}</Text>
          </Animated.View>
          </TouchableHighlight>
        )
          
      }}
      />
      <View style={{zIndex:1,flex:2.5,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.1)',transform:[{translateY:(0)},{translateX:(0)}]}}>
      
      </View>
    </View>
      <View style={{position:'absolute'}}>
      <Image
        resizeMode="contain"
        source={require('./images/background.png')}
        blurRadius={0}
      />
    </View>
    </View>
    
    
  );
};


export default Dashboard;
