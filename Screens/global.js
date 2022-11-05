/**Set global variables to handle user information
 * @param {string} authUserID - ID of user currently logged in
 * @param {string} authUserType - Type of user currently logged in
 * @param {string} authUserEmail - Email of user currently logged in
 * @param {string} authUserPassword - Password of user currently logged in
 * @param {string} authUserFirstName - First name of user currently logged in
 * @param {string} authUserLastName - Last name of user currently logged in
 * @param {string} doctorsList - List of doctors
 * @param {string} notificationId - default ID of notification
 *
 */

global.authUserID = "";
global.authUserRef = "";
global.authUser = "";
global.authUserProfilePic = "https://i.imgur.com/3bOE2E6.jpeg";
global.defaultProfilePic = "./images/user.png";
global.authName = "";
global.authLastName = "";
("https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png");
global.notificationList = [
  {
    id: 1,
    userID: 2,
    userName: authUserID,
    heading: "Emergency Pafe",
    message: "You sent a message at xx:xx:xx",
    time: "09:15:43",
    date: "14/10/2022",
    day: "Friday",
    body: "Notification sent at xx:xx:xx",
  },
];
global.MSuser = {};
global.authEmail = "";
global.eventData = [{}];
global.showEvent = false;
global.doctorsList = [];
global.notificationList = [];
