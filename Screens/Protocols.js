import {firebase} from "../firebase"
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/core'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TextInput,
  Button,
  Linking,
} from 'react-native';
import { Alert, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image } from 'react-native';

function getData (){
  const data =[
    {
        id:1,
        Protocol:"Asthma_Attack",
        content:" 1) Sit the person upright.  2) Give 4 separate puffs of blue/grey reliever puffer.  3) Wait 4 minutes.  4) If breathing does not return to normal, call for an ambulance."
  
    },
    {
      id:2,
      Protocol:"Burn Treatment",
      content:" 1) Stop Burning Immediately: Put out fire or stop the person's contact with hot liquid, steam or other material.  2) Remove Constrictive Clothing Immediately: Take off jewelry, belts and tight clothing. Burns can swell quickly.  3) Cool Burn: Hold burned skin under cool (not cold) running water or immerse in cool water until the pain subsides.  4) Protect Burn: Cover with sterile, non-adhesive bandage or clean cloth.  5) Treat Pain: Give over-the-counter pain reliever such as acetaminophen (panadol, tylenol), ibuprofen"
  },
  {
    id:3,
    Protocol:"Electric Shock",
    content:"1) Separate the Person From Current's Source: Unplug an appliance if plug is undamaged or shut off power via circuit breaker, fuse box, or outside switch. If you can't turn off power, try to separate the person from current using non-conductive object such as wooden or plastic broom handle, chair, or rubber doormat.  2) Do CPR, if Necessary: When you can safely touch the person, do CPR if the person is not breathing or does not have a pulse.  3) Check for Other Injuries: If the person is bleeding, apply pressure and elevate the wound if it's in an arm or leg. There may be a fracture if the shock caused the person to fall. For burns, see Burn Treatment.  4) Call and wait for emergency services to Arrive"
},
{
  id:4,
  Protocol:"Gunshot Wound",
  content:"1) Separate the Person From Current's Source: Unplug an appliance if plug is undamaged or shut off power via circuit breaker, fuse box, or outside switch. If you can't turn off power, try to separate the person from current using non-conductive object such as wooden or plastic broom handle, chair, or rubber doormat.  2) Do CPR, if Necessary: When you can safely touch the person, do CPR if the person is not breathing or does not have a pulse.  3) Check for Other Injuries: If the person is bleeding, apply pressure and elevate the wound if it's in an arm or leg. There may be a fracture if the shock caused the person to fall. For burns, see Burn Treatment.  4) Call and wait for emergency services to Arrive"
},
{
  id:5,
  Protocol:"Heart Attack",
  content:"1) Call 999: You or someone else should call 911 immediately if you suspect a heart attack.  2) Begin CPR if the person is unconscious. If the person isn't breathing or you don't find a pulse, begin CPR to keep blood flowing after you call for emergency medical help.  3) If an automated external defibrillator (AED) is immediately available and the person is unconscious, follow the device instructions for using it."
},
{
  id:6,
  Protocol:"Test Protocol",
  content:"1) We are testing if this works"
}]

    var n = 1;
 firebase.firestore()
 .collection('emergency_protocols')
 .get()
 .then(querySnapshot => {
    n++
  
    querySnapshot.forEach(documentSnapshot => {
    data.push({id:n,Protocol: documentSnapshot.id,content:documentSnapshot.data().protocol_1} )
     
   });
     
 });
   return data
 }

const Protocols = () => 
{
  const [clicked,setClick]=useState(data)
  const toggle =i=>{
    if(clicked==i){
      return setClick(null)
    }
    setClick(i)
  
  } 

  const data=getData();
    return (
      
        
          data.map((item, i) => (
       
              
              <View style={styles.item} >
                
              <View style={styles.protocolName} >
                <TouchableOpacity key={i} onPress={()=>toggle(i)}>
              
 
              <Text style={styles.categoryText}> <Text> 
                  {clicked==i ? '-':'+'} </Text>{item.Protocol}</Text>
              </TouchableOpacity>
              </View>

            <View style= {clicked==i ? styles.content_show:styles.content} ><Text>{item.content}</Text> </View> 
              </View>
            
            
          ))
        
   
   )
   

};


     const styles = StyleSheet.create({

    
        container: {
          flex: 1,
          justifyContent: 'center',
          //paddingTop: (Platform.OS === 'ios') ? 20 : 0,
          backgroundColor: 'rgba(18,33,65,0.8)',
        },
        iconStyle: {
          width: 30,
          height: 30,
          justifyContent: 'flex-end',
          alignItems: 'center',
          tintColor: 'rgba(18,33,65,0.8)'
        },
        subCategoryText: {
          fontSize: 18,
          color: '#000',
          padding: 10
        },
        categoryText: {
          textAlign: 'left',
          color: 'white',
          fontSize: 21,
          padding: 10
        },
     
        wrapper:{
          cursor:'pointer',
          flex: 1,
          justifyContent: 'center',
          height: '80%',
          width: '80%',
          alignItems:'center'
      },
      protocolName:{
        
        justifyContent:'space-between',
        cursor:'pointer',
        flexDirection:'row',
      
        backgroundColor:'rgba(18,33,65,0.8)',
        
     

      },
      item:{
        
        marginBottom:10,
        cursor:'pointer',
        backgroundColor:'rgba(18,33,65,0.8)',
        marginTop:5,

        padding:10
      },
      content:{
        cursor:'pointer',
        backgroundColor:'white',
        overflow:"hidden",
        maxHeight:0
        
      },
      content_show:{
        cursor:'pointer',
        backgroundColor:'lightblue',
        marginBottom:10,
        marginTop:10,
        padding:30,
        opacity: 1,
        maxHeight:9999,
        transition:'opacity 1s linear'

      }



      });

      export default Protocols;
