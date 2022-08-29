import { firebase } from "../firebase";

import { v4 as uuidv4 } from "uuid";

export async function getSchedule(onReceiveList) {
  var schedules = [];
  firebase
    .firestore()
    .collection("schedules")
    .where("student_id" == authUserID)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        schedules.push({
          key1: schedules.length + 1,
          created_at: doc.data().created_at,
          hospital_ID: doc.data().hospital_id,
          ID: doc.data().id,
          specialty_duration: doc.data().specialty_duration,
          start_date: doc.data().start_date,
          end_date: doc.data().end_date,
          specialty_id: doc.data().specialty_id,
          student_id: doc.data().student_id,
          updated_at: doc.data().updated_at,
          week_no: doc.data().week_no,
        });
      });
    });
  onReceiveList(schedules);
}
