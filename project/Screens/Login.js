import React, { useState ,useEffect} from 'react'
import {Platform,Keyboard, TouchableWithoutFeedback,TouchableOpacity,KeyboardAvoidingView,StyleSheet, Text, TextInput, View } from 'react-native'
import {auth} from "../firebase"
import {useNavigation} from '@react-navigation/core'


const Login = () => {

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigation =useNavigation()
    const LoginFirebase =() =>{
        // login with email and password
        auth.signInWithEmailAndPassword(email,password).then(userCredentials =>{
            const user =userCredentials.user;

            auth.onAuthStateChanged(user =>{
                // if user has succ then the dashboard appears
                if(user){navigation.navigate("Dashboard")}
          
            })
        }).catch(error => alert(error.message));


      }
      


      // this allows you to switch between different screens



  return (

      //TouchableWithoutFeedback - when i click anywhen outside od the keyboard, the keyboard will disappear

    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView 
    style={styles.container}
     // needs fixing // when keyboard appers things move up a bit
     >   
         <View>
             <Text>Student Placement System</Text>
         </View>
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

     <View style={styles.btnStyle}>
        <TouchableOpacity
            onPress={LoginFirebase}   // when user clicks on login button 
            >
            <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity>
    </View>
    
    </KeyboardAvoidingView>
   // </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },

inputStyle:{
width: "70%"

},
input:{
    backgroundColor:"white",
    padding:10,
    borderRadius:15,
    marginTop:10,
},
btnStyle:{
    width:"50%",
    backgroundColor:"white",
    marginTop:50,
    borderColor:"lightblue",
    borderWidth:2,
    borderRadius:10,
    alignItems:'center'
},

buttonText:{
color:"blue",
fontSize:16,
fontWeight:"bold",
},       

})