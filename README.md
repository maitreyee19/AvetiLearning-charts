## Overview
The application provides realtime Question Answer session for live classes hosted from youtube.
## How to use
### SetUp
#### 1. Clone the git repository
```
    git clone
```
#### 2. Install the dependencies
```
    npm install
```
#### 3. Start the local Node/Express Server  
```
    npm start
```


### Usage
#### Steps for Teacher
1. As Instructor   navigate to http://localhost:3000
1. from instructor page ,instructor has to provide the question number/id he wants to activate in the input field 
1. then instructor need to click question ready button to brodcast message to students that the question is coming up
1. Next Activate question will be clicked . This will activate the question on the students page
1. Then Instructor can Deactivate the question and student will get the notification about their answer.
1. Intructor will get the visualization of Answer statistics in Instructir page.

#### Steps for Student
1. As student will navigate to http://localhost:3000/16.html
1. Students need to put his/her name to participate in question Answer session if using for the 1st time . Otherwise it will pick from the local staorage
1. When student gets the question they can fill out the answer and submit
1. Student will get the feedback if the answer is right or not

