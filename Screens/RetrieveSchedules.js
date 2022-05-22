import { firebase } from "../firebase";

import { v4 as uuidv4 } from "uuid";

export async function getSchedule(onReceiveList) {
  // Exports an array of JS objects for a user's schedule's.
  // Keys: {key1, created_at:, hospital_ID, ID, specialty_duration, specialty_id, student_id, updated_at, and week_no}
  var schedules = [];

  firebase
    .database()
    .ref("/schedules")
    .on("value", (snapshot) => {
      //if(snapshot.val()==email)

      const key = snapshot.forEach(function (data) {
        schedules.push({
          key1: schedules.length + 1,
          created_at: snapshot.child(data.key + "/created_at").val(),
          hospital_ID: snapshot.child(data.key + "/hospital_id").val(),
          ID: snapshot.child(data.key + "/id").val(),
          specialty_duration: snapshot
            .child(data.key + "/specialty_duration")
            .val(),
          specialty_id: snapshot.child(data.key + "/specialty_id").val(),
          student_id: snapshot.child(data.key + "/student_id").val(),
          updated_at: snapshot.child(data.key + "/updated_at").val(),
          week_no: snapshot.child(data.key + "/week_no").val(),
        });
      });
    });

  onReceiveList(schedules);
}
