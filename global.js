global.authUserID = "";
global.authUserRef = "";
global.authUser = "";
global.authUserProfilePic = "";
<<<<<<< Updated upstream
global.defaultProfilePic =
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";
=======
global.defaultProfilePic = global.authName = "";
global.authLastName = "";
("https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png");
const createFirebaseSchedule = (authUserID) => {
  firebase
    .database()
    .ref("/schedules")
    .on("value", (snapshot) => {
      const key = snapshot.forEach(function (data) {
        const firebaseStudentID = snapshot
          .child(data.key + "/student_id")
          .val();
        if (firebaseStudentID == authUserID) {
          console.log("Found matching ID: ", data);
        }
      });
    });
};
>>>>>>> Stashed changes
