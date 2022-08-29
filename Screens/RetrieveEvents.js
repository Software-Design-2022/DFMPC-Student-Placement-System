import {firebase} from "../firebase"

import { v4 as uuidv4 } from 'uuid';


export async function getEvents(onReceiveList) {
    var events = [];
    firebase.firestore().collection('events').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            schedules.push({
                key1: events.length + 1,
                name: doc.data().nme,
                programme: doc.data().programme,
                ID: doc.data().id,
                start_date: doc.data().start_date,
                end_date: doc.data().end_date,
            });
        });
    })
    onReceiveList(events);
}
