# Fitness Information System: MyFitZone

In today's health-conscious world, maintaining an active lifestyle is more important than ever. With the increasing emphasis on personal fitness and well-being, individuals are seeking innovative ways to track and manage their fitness journeys. MyFitZone is an Information System designed to meet this demand by providing users with an intuitive and interactive platform to document their fitness activities, track progress, and stay motivated, accompanied by a user-friendly modern and minimalistic interface.

MyFitZone serves as a personal fitness management system, offering users the ability to enter daily diary entries, explore a range of exercises, enter own exercises and workouts. The application accommodates users of all fitness levels, allowing signing up, maintaining a user profile and keeping journal activity streak.

## Table of Contents

- [Features](#features)
  - [User Registration and Profile](#user-registration-and-profile)
  - [Diary Entries](#diary-entries)
  - [Exercise Management](#exercise-management)
  - [Workout Management](#workout-management)
  - [Activity Tracking by Streak Calculation](#activity-tracking-by-streak-calculation)
- [Technologies Used](#technologies-used)
- [Links](#links)


## Features

### User Registration and Profile

- **User Registration:** Users can sign up by providing their email, name, surname, and password.
- **Profile Creation:** Upon registration, a user profile is created automatically. Users can update their profile with information such as height, weight, daily caloric intake, and profile picture.
- **User Login/Logout:** Registered users can log in to access their personalized dashboard and log out securely to terminate their session.

### Diary Entries

- **View Entries:** Users can access and review details of their diary entries, including calories burned and hours slept. Linked workouts can also be viewed.
- **Add Entry:** Users can create new diary entries by providing various details such as activity duration, calories burned and consumed, hours slept, and water intake. Entries can be linked to specific workouts.


### Exercise Management

- **View Exercises:** Users can view the list of exercises, including those added by admins and themselves.
- **Add Exercise:** Users can add new exercises by providing details such as exercise name, video URL, description, and category. Personal exercises are only visible to the user who added them, while admin exercises are available to all users.
- **Delete Exercise:** Users can delete their exercises from the database.
- **Set Exercise as Favorite:** Users can mark exercises as favorites for easier access.
- **Search Exercises:** Users can search exercises by their name or category.

### Workout Management

- **View Workouts:** Users can browse available workouts, including workout names, descriptions, and the exercises included.
- **Add Workouts:** Users can create customized workouts by dynamically selecting exercises from the existing exercise library and specifying the number of sets and reps.
- **Delete Workouts:** Users can delete workouts they do not want in their database anymore.

### Activity Tracking by Streak Calculation

- **Streak Calculation:** The system updates user streaks based on daily diary entries. Streaks are incremented if the entry is made on the following day, reset if more than one day has passed, and maximum streaks are updated if exceeded.
- **Total Entries:** The total number of entries is incremented with each new diary entry.

## Technologies Used

- **Backend:** Node.js, Express
- **Frontend:** React, Bootstrap
- **Database:** MySQL


## Links
- **Demo Video:** https://youtu.be/MF_PLFDbYQk
- **Live Application:** http://88.200.63.148:1046
