import {firebase} from "../firebase"

import { v4 as uuidv4 } from 'uuid';



export async function getList(onReceiveList) {

  var protocols = []


  var snapshot = await firebase.firestore()
    .collection('emergency_protocols')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(function (doc) {
        protocols.push({key:protocols.length+1,Protocol: doc.id,content:doc.data().protocol_1});
      })

    })

  onReceiveList(protocols);
}