import { firebase } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export async function getSchedule(onReceiveList) {
  var schedules = [];
  var snapshot = await firebase
    .firestore()
    .collection("schedules")
    .where("student_id", "==", authUserID) //@Noku - this is where we are filtering the data to be specific to the student logged in
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        //push the required data to the array
        schedules.push({
          key: schedules.length + 1,
          student_id: doc.data().student_id,
          SpecialtyName: doc.data().SpecialtyName,
          hospital_ID: doc.data().hospital_id,
          specialty_duration: doc.data().specialty_duration,
          start_date: doc.data().start_date,
          end_date: doc.data().end_date,
          specialty_id: doc.data().specialty_id,
        });
      });
    });
  console.log(schedules);
  onReceiveList(schedules);
}
