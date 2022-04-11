# DFMPC-Student-Placement-System

## Project Description

- Student Mobile App(SPS) - A student app which integrates with the student Placement System. The app will need to accomodate any student needs and any relevant information on the system needs to be presented to students via app. For example, the app may need to present the student with their schedule for a specific Block.

## User Stories

- As a medical student user, I should be able to insert my student email and the corresponding password to access my student placement application.
- As a medical student user, logged into the student placement application, I should always have immediate access to a panic button for emergencies.
- As a medical student, I should be able to access a schedules sections that allow me to see where my next placement will be, duties for that placement, and the duration of the placement.
- Being a medical student, I should be able to communicate with my supervisors and contact my clinical officers from the app.
- As a medical student, I should be able to log any academic disclaims for any pupils that are academically dishonest.

## User Acceptance Test

- Given I am the medical student and I have the correct student email and corresponding password then I should be able to log into my student placement account on the application.
- Given I am the medical student, when I am already logged into my account and on any interface of the app, then I should be able to click on a panic button on emergencies.
- Given that I am the medical student, when I am logged into my student placement account, then I should be able to access a schedule section from the dashboard to see the location of my next placement and it's duration.
- Given I am the medical student, when I am logged into the app then I should have the ability to communicate with my supervisors and and contact my clinical officers.
- Given that I am the medical student when logged into my student placement account, then I should be able to log any academic disclaims for any pupils that are academically dishonest.

# Requirements

## Functional Requirements
- The student placement system should be able to accept any student email and corresponding password.
- The student placement system should be able to provide a panic button for emergencies.
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

![UserInterface Design](https://github.com/Software-Design-2022/DFMPC-Student-Placement-System/blob/main/uidesign.jpg)

## Software Architecture

![Software Architecture Description](https://github.com/Software-Design-2022/DFMPC-Student-Placement-System/blob/17c20784cb78bcfa8b5c250eace39a3c63011f18/Arch_des.png)

## Software Design

![Software Design Description](https://github.com/Software-Design-2022/DFMPC-Student-Placement-System/blob/17c20784cb78bcfa8b5c250eace39a3c63011f18/Software_Description.png)

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

[![CircleCI](https://circleci.com/gh/Software-Design-2022/DFMPC-Student-Placement-System.svg?style=svg&circle-token=09a71fa0f96ca31f85ee8822bf1594419064f557)](https://app.circleci.com/pipelines/github/Software-Design-2022)
