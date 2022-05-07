import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/core'
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity,TouchableHighlight, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import {LinearGradient} from 'expo-linear-gradient';


//Constants to dictate side of elements in UI
const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
const image = { uri: "https://reactjs.org/logo-og.png" };
const witsLogo= {uri: "https://www.wits.ac.za/media/wits-university/news-and-events/images/logos-and-icons/Wits-Logo-Mono-Neg-Legal-600x300.png"}

//Data for flatlists, image for iamges, destination for where button navigates to.
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Schedule',
    destination: 'Schedule',
    image: require("./schedule.png"),
  },
  
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Calendar',
    destination: 'CalendarView',
    image: require("./calendar.png"),
  },
  {
    id: '38694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Assignments',
    destination: 'BackgroundTest',
    image: require("./assignment.png"),
  },
  {
    id: '28694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Tasks',
    destination: 'BackgroundTest',
    image: require("./tasks.png"),
  },
  {
    id: '18694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Logbook',
    destination: 'BackgroundTest',
    image: require("./logbook.png"),
  },
  
  {
    id: '08694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Settings',
    destination: 'SettingsView',
    image: require("./settings.png"),
  },
  
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Logout',
    destination: 'Login',
    image: require("./logout.png"),
  },
  
  
  
];



const Dashboard = () => {
  //Use navigation
  const navigation =useNavigation()
  
  //Changes button colour slightly when tapped
  const [selectedId, setSelectedId] = useState(null);
  const [name, SetName] = useState('');

  //Render function for vertical flatlist
  const renderItem = ({ item }) => {

    const backgroundColor = item.id === selectedId ? "#7fb4e1" : "#bcbcbc";
    const color = item.id === selectedId ? 'black' : 'black';
    return (

      //view to get image next to text button
    <View style={{flexDirection: 'row',
    padding:SPACING,
    backgroundColor:' rgba(255,255,255,0.1)',
    flex:1,
    borderRadius:8,
    marginBottom:SPACING,
    shadowColor:"rgba(0,0,0,1)",
    shadowOffset:{
      width: 0,
      height:10,
    },
    paddingTop:10,
    shadowOpacity:1,
    shadowRadius:20,
    }}>

      
       <View>
        <Image source={item.image}
        style={{width:AVATAR_SIZE,height:AVATAR_SIZE,borderRadius:AVATAR_SIZE
        ,marginRight:SPACING/2,
        }}
        >
        </Image>
      </View>
      <View style={{width:"75%",flex:21}}>
      <LinearGradient colors={['rgba(30,55,108,1)', ' rgba(30,55,108,0.8)', 'rgba(30,55,108,1)']} style={styles.linearGradient}>
      <TouchableOpacity
       //adds a touchable opacity on each image going to each items destination
            onPress={()=>{navigation.navigate(item.destination)}}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>{item.title}</Text>

        </TouchableOpacity> 
    </LinearGradient>
      </View>
      </View>
    );
    
  };

  //render function for horizontal flatlist
  const renderItem2 = ({ item }) => {
    return (

    <View style={{flexDirection: 'row',
    padding:SPACING,
    flex:1,
    paddingTop:10,
    borderRadius:100,
    marginBottom:SPACING/2,
    paddingBottom:5,
  
    }}>
       <View>
         <TouchableHighlight activeOpacity={0}
         //adds a touchable highlight on each image going to each items destination
      underlayColor={'rgba(18,33,65,0)'} onPress={()=>{navigation.navigate(item.destination)}}>

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

    //main views for layout of UI
    <SafeAreaView style={{flex:1, backgroundColor:' rgba(255,255,255,1)'}}>
    <View style={{ flex:1, backgroundColor:' rgba(30,55,108,1)',borderRadius:15,}}>
     <View style={{height:ICON_SIZE+20, backgroundColor:'  rgba(30,55,108,1)', borderRadius:10}}>

       
       <View>
         
       <Image 
       style={{width:240,
        height:120,
        position: 'absolute',
                left: SPACING,
                top: -10,
                resizeMode: 'stretch',
        marginRight:SPACING/2,
       // Wits icon in top left
        }}
        source={witsLogo}
        />


        
        <View>
          <TouchableHighlight
        //View for touchable icon in top right for settings
         activeOpacity={0}
      underlayColor={'rgba(18,33,65,0)'}
         onPress={()=>{navigation.navigate("SettingsView")}}>


       <Image 
       //Style for icon in top right
       style={{width:ICON_SIZE,
        height:ICON_SIZE,
        resizeMode: 'cover',
        marginLeft:width -ICON_SIZE,
        borderRadius:ICON_SIZE
        ,marginRight:SPACING/2,
        marginTop:10,
        borderWidth:0,
        alignSelf: 'flex-end',
        borderColor:"rgba(0,0,0,1)",
        backgroundColor:"rgba(255,255,255,1)",
      shadowOffset:{
      height:10,
      shadowColor:'black'
      },
       shadowOpacity:1,
      shadowRadius:20,
        }}
        source={require("./bear.gif")}
        />
        </TouchableHighlight>
        </View>   
     
     </View>
     
     </View>
     
     <View style={{flex:1, backgroundColor:' rgba(18,33,65,0.8)'}}>
      <FlatList contentContainerStyle={{
        // First horizontal flatlist with shortcuts for navigation
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
    
    <View style={{flex:6.5, backgroundColor:' rgba(18,33,65,0.8)'}}>
      <FlatList contentContainerStyle={{
        // Second vertical flatlist with navigation to each page
        padding:SPACING/8,
        paddingTop:SPACING,

      }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <TouchableHighlight activeOpacity={0}
      // adds icon in bottom left for navigation to protocol page
      underlayColor={'rgba(18,33,65,0)'}
      onPress={()=>{navigation.navigate("Protocols")}}>
       <Image 
       style={{width:ICON_SIZE,
        height:ICON_SIZE,
        borderRadius:ICON_SIZE,
        marginRight:ICON_SIZE
        }}
        source={require("./emergency.gif")}
        />
        </TouchableHighlight>
    </View>
    </View>

     
 
    </SafeAreaView>
  );
};

//styles
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
    paddingTop: AVATAR_SIZE/4,
  },
  buttonText: {
    fontSize: AVATAR_SIZE/3,
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