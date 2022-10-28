/**
 * Global functions for the app.
 * @module GlobalVariables - The Global Variables Component
 * @description This hold the global variables needed to be shared across the app.
 */

global.authUserID = "";
/**
 *  @global
 *  @type {string}
 * @description ID of user currently logged in
 * @example "123456789"
 */
global.authUserRef = "";
/**
 * @global
 * @type {string}
 * @description Reference to user currently logged in
 * @example "users/123456789"
 */
global.authUser = "";
/**
 * @global
 * @type {string}
 * @description Name of user currently logged in
 * @example "John Smith"
 */
global.authUserProfilePic = "https://i.imgur.com/3bOE2E6.jpeg";
/**
 * @global
 * @type {string}
 * @description Profile picture of user currently logged in
 * @example "https://i.imgur.com/3bOE2E6.jpeg"
 * @see https://imgur.com/3bOE2E6
 */
global.defaultProfilePic = "./images/user.png";
/**
 * @global
 * @type {string}
 * @description Default profile picture of user
 * @example "./images/user.png"
 * @see https://imgur.com/3bOE2E6
 */
global.authName = "";
/**
 * @global
 * @type {string}
 * @description Name of user currently logged in
 * @example "John Smith"
 */
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
/**
 * @global
 * @type {Array}
 * @description List of notifications
 */
global.MSuser = {};
/**
 * @global
 * @type {Object}
 * @description Object containing user details
 */
global.authEmail = "";
/**
 * @global
 * @type {string}
 * @description Email of user currently logged in
 */
global.eventData = [{}];
/**
 *
 * @global
 * @type {Array}
 * @description Array of events
 */
global.showEvent = false;
/**
 * @global
 * @type {boolean}
 * @description Boolean to show event
 * @example true
 */
global.notificationId = 0;
/**
 * @global
 * @type {number}
 * @description ID of notification
 * @example 1
 */
global.doctorsList = [];
/**
 * @global
 * @type {Array}
 * @description Array of doctors
 */
