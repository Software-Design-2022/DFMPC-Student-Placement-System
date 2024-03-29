import {firebase} from "../firebase"
import { v4 as uuidv4 } from 'uuid';





export async function getEvents() {
    var events = [];
    var snapshot = await firebase
    .firestore()
    .collection("events")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
        
            events.push({
                key: events.length + 1,
                name: doc.data().name,
                programme: doc.data().programme,
                ID: doc.data().id,
                start_date: doc.data().start_date,
                end_date: doc.data().end_date,
            });
    
        });
    });
   onReceiveList(events);
}

