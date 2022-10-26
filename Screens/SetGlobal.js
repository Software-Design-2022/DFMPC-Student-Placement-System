
import { firebase } from "../firebase";
import "./global";

export async function setDoctorsList (){

    var doctors = [];
    var snapshot = await firebase
      .firestore()
      .collection("doctors")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doctors.push({
            name: doc.data().name,
            email: doc.data().email,
            id: doc.data().id,
            photo: doc.data().photo,
          });
        });
      });


      doctorsList=doctors;

}


// get notifications upon login

