import React, { useState ,useEffect} from 'react'
import {ImageBackground,Platform,Keyboard,Image,
   TouchableWithoutFeedback,TouchableOpacity,
   KeyboardAvoidingView,StyleSheet, Text,Button,
    TextInput, View,Alert } from 'react-native'
import { useFonts } from 'expo-font';
import {firebase} from "../firebase"
import {useNavigation} from '@react-navigation/core'

import {LinearGradient} from 'expo-linear-gradient';

const Login = () => {


    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigation =useNavigation()


    function showAlert(title, message) {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
       // onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
     
    }
  );
    }
    const LoginFirebase =() =>{
        // login with email and password

        // check if email exists in the database if so then hash pass and compare 

        var found = false
        firebase.database().ref('/users').on('value',snapshot=>{
            //if(snapshot.val()==email)
               const key = snapshot.forEach(function(data) {
     
                const check_email =snapshot.child(data.key+"/email").val();
             
                const encrypted = snapshot.child(data.key+"/password_digest").val();

               if(check_email===email){
                   found =true
              
              
                    if(encrypted===password){
                        navigation.navigate("Dashboard")
                    }
                    else{
                        showAlert("Password Error","Your email and password do not match")
                    }
                }              
            });
           if(found===false){
            showAlert("Email Error","user does not exist")
           }
        })
      }
      // this allows you to switch between different screens

  return (

      //TouchableWithoutFeedback - when i click anywhen outside od the keyboard, the keyboard will disappear

    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView 
    style={styles.container}
     // needs fixing // when keyboard appers things move up a bit 
     
      > 
      
     <Image
        style={styles.BackGround}
        source={require('./Trianglify-8.3s-2000px.svg')}
        />
    <Image
        style={styles.stretch}
        source={require('./Vanilla-1s-648px.svg')}
      />
      
      
     <View style={styles.inputStyle}>
         <TextInput
             placeholder="Enter email"
             value={email}
             onChangeText={text => setEmail(text)}   //  set email to what the text is
             style={styles.input}>
         </TextInput>
         <TextInput
             placeholder="Enter password"
             value={password}
             onChangeText={text => setPassword(text)} // set password to what the text is
             style={styles.input}
             secureTextEntry>

         </TextInput>
     </View>
     <View style={styles.ButtonStyle}>
     <LinearGradient colors={['#1d497b', '#1d497b', '#1d497b']} style={styles.linearGradient}>
     <TouchableOpacity
            onPress={LoginFirebase}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity> 
    </LinearGradient>
    
     </View>
     
     
      
  

    </KeyboardAvoidingView>
   // </TouchableWithoutFeedback>
  )
}

export default Login;






const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },

inputStyle:{
width: "60%"
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
      
})