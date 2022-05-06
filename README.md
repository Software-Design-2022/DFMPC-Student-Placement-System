# DFMPC-Student-Placement-System

## Project Description

- Student Mobile App(SPS) - A student app which integrates with the student Placement System. The app will need to accomodate any student needs and any relevant information on the system needs to be presented to students via app. For example, the app may need to present the student with their schedule for a specific Block.

## User Stories

- As the user, I should be able to click on a panic button while on any interface after logging in, which will take me to the emergency protocol interface.
- As the user, I should be able to click on a profile icon, that will allow me to have user settings and the ability to change profile image, password, and general user settings.
- As the user, while on the schedule interface, I should be able to see a weekly dated calendar with upcoming assessments.
- As the user, while on the dashboard I should have access to a different calendar view that has a daily dated view of upcoming events.
- As an admin, I should have a separate system that can not be accessed from the student application, so that I can give assessments and placements for students.

## User Acceptance Test

- Given that I am a user, when I am on any interface then I should be able to click on a panic button that will take me to the emergency protocol page.
- Given that I am the user, when I am on the dashboard, a profile icon should be available for me to click and then have the ability to change my password, profile image and make general user settings changes.
- Given that I am the user, when I am on the schedule interface, then I should be able to see a calendar that has a weekly view of my upcoming events.
- Given that I am the user, when I am on the dashboard. , then I should be able to have access to a different calendar that has a daily dated view.
- Given that I am the admin user with the correct password when clicking on the log-in button, then I should be able to have access to a different system that is capable of letting me assign tasks and placements to the students.

# Requirements

## Functional Requirements

- Login page - the student placement system should be able to accept any student email and corresponding password.
- Dashboard - the Dashboard allows the student to navigate to their schedule and the emergency protocols page
- The student placement system should be able to provide a panic button for emergencies.
- Emergency Protocols Page - this page shows the protocols for common emergencies
- The student placement system should be able to provide a schedule section that allows the student to see where their next placement is and the duration of the placement.
- The student placement system should be able to provide a communication section that allows the student to communicate with their supervisors and clinical officers.
- The student placement system should be able to provide a section that allows the student to log any academic disclaims for any pupils that are academically dishonest.

## Non-Functional Requirements

- The app is easy to use and efficient
- The app is user friendly
- The app is secure
- The app is reliable
- The app is easy to maintain
- The app is easy to extend
- The app is easy to install
- The app is easy to upgrade
- The app is easy to customize
- The app is scalable

## On-Screen appearance requirements

![UserInterface Design](https://github.com/Software-Design-2022/DFMPC-Student-Placement-System/blob/main/assets/images/uidesign.jpg)

## Software Architecture

![Software Architecture Description](https://github.com/Software-Design-2022/DFMPC-Student-Placement-System/blob/main/assets/images/Arch_des.png)

## Software Design

![Software Design Description](https://github.com/Software-Design-2022/DFMPC-Student-Placement-System/blob/main/assets/images/Software_Description.png)

## Database Design

![Database Diagram1](https://user-images.githubusercontent.com/67168444/166960442-32cf8b2c-202f-4eb9-8c34-4f6034dba991.png)

The above image shows the structure of our database which is hosted on firebase. The connections between the tables are shown by lines. The admins and protocols tables are their own separate entities and have no relations with any of the other tables.

## Dependencies

```
    react-navigation/native": "^6.0.10",
    react-navigation/native-stack": "^6.6.1",
    bcrypt-react-native": "^1.1.1",
    bcryptjs": "^2.4.3",
    expo": "~44.0.0",
    expo-status-bar": "~1.2.0",
    firebase": "^9.6.10",
    react": "17.0.1",
    react-dom": "17.0.1",
    react-native": "0.64.3",
    react-native-calendar-picker": "^7.1.2",
    react-native-safe-area-context": "3.3.2",
    react-native-screens": "~3.10.1",
    react-native-web": "0.17.1"

```

## Continuous Integration: CircleCI Badge

[![CircleCI](https://circleci.com/gh/Software-Design-2022/DFMPC-Student-Placement-System.svg?style=svg)](https://app.circleci.com/pipelines/github/Software-Design-2022)



## Mocha Testing

![Test](test/badge.svg)
## Code Coverage Badge: CodeCov
