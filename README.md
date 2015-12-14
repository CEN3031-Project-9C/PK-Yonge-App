# PK-Yonge-App
A web-based application that allows students at [PK Yonge Developmental Research School](http://pkyonge.ufl.edu/) (in Gainesville, FL) to practice for their end-of-course exams.
This application is being made in an Introduction to Software Engineering (CEN3031) class at the University of Florida, and was created using the MEAN framework.

## Deployment: 
Our app is deployed through HEROKU. Deployment information can be found [here](https://devcenter.heroku.com/articles/deploying-nodejs). Please contact [@Nicola37] for further deployment questions
#### Deployed Site: http://pky-eoc.herokuapp.com/

### Group Members
The group working on this project consists of:
- Bailey Anderson [@baileyanderson](https://github.com/baileyanderson)
- Cody Fitzpatrick [@CodyFitzpatrick](https://github.com/CodyFitzpatrick)
- Nicola Frachesen [@Nicola37](https://github.com/Nicola37)
- Guilain Huyghes-Despointes [@ghDespointes](https://github.com/ghDespointes)
- Sara Lichtenstein [@saralich](https://github.com/saralich)
- Terry Philippe [@tjphilippe](https://github.com/tjphilippe)
- Xiaoxi Zheng [@XiaoxiZheng](https://github.com/XiaoxiZheng)

### Running the App locally
- Install all necessary packages and libraries by following [this installation guide](https://docs.google.com/document/d/1B7aqptx0jsWHLqm7W9BT1oKHYNCKkvwtjjUtsj6C-ks/edit?pli=1) 
- Running in the terminal by typing: grunt

**Note this app was developed using Node version 0.12.7, newer version of node may cause this app to run differently. 

```sh
$ git clone https://github.com/CEN3031-Project-9C/PK-Yonge-App
$ cd PK-Yonge-App
$ grunt

```
### Updating the database connection
- In the file C:\PK-Yonge-App\config\env\development.js
- Change line 6 to 14 to your respective login credentials and mongoLab information

## Completed Features
- Allow a user to **create an account**, **modify their profile information**, **log in**, **log out**, and **retrieve a forgotten password**.
    - We used the default MEAN application's functionality in the "users" module for this, located in `modules/users/`.
    - User details are saved in the `users` collection in MongoDB.
    - Email credentials used to send the forgotten password emails are located in `config/env/local.js`.
    -  Emailing scripts are located in `scripts/reset-password.js/` 
- Allow a user to **select a test** they'd like to take.
    - Accomplished via custom functionality in the "choose-test" module, located in `modules/choose-test/`.
    - The user's test choice is stored within a templated object that is created and then saved as a document in the `user_sessions` collection in MongoDB (in `modules/choose-test/choose-test.client.controller.js`). This specific document (as each user_session is associated with a different testing session) should be updated as the user takes the test  in order to save their answers, notes, mark-for-review flags, etcetera, but as described below in the "Buggy Features" section, this functionality is not working.
- Allow the user to **take a test** (view questions specific to their chosen test, select answers, and save those answers).
    - As follows are various working features that aid in the test-taking process.
        - A basic four function calculator
        - Formula Sheet
        - Navigation between different questions
        - Notepad that properly stores notes for every individual question
        - Mark for review and that will be reflected in the drop down navigation, and on the individual questions
        - Pop-up warnings when navigating between questions without answering
        - Pop-up warnings when there are questions unanswered when submitting the test
        - Pop-up warnings when time is up
    - The user_session object (that is first instantiated and then stored in the `user_sessions` collection in MongoDB via `$scope.startTest` function in `modules/choose-test/choose-test.client.controller.js`) is updated as the user takes the test (i.e. if the user selects an answer for question 1, then the value is updated in slot 0 in the `user_answers' array - this array is a property of the `user_session` object in the aforementioned controller  as well as a property of the document in the `user_sessions` collection in MongoDB); this is done for all properties:
        - `time`
        - `complete`
        - `user_notepad`
        - `user_answer`
        - `review`
        - `correct`
    - Please note how the aforementioned property names and types are consistent across the application in the MongoDB collections and the Mongoose Schema "Models" found throughout the application. Some of the aforementioned propeties are updated explicity as the user takes the test (i.e. user_notepad if user updates a question's notes, user_answer if they select or change an answer to a question, review if they mark a question for a review) but time, completed, and correct, are updated in the background (time is counted down as the user takes the test, complete is marked true if the user has answered the question, and correct is marked true if the user got the question correct during the grading process).
- Allow the user to **review test performance** for a previously-taken test.
    - The user can see how they did on a test they just submitted, but this information is only stored locally and there is no page for the user to review ALL of their previous tests (see "Buggy Features" section).

## Incomplete Features
- **Saving the user's test information to the database**. This information is currently being stored locally on the user's computer and is lost after the user exits the application.
- **Allowing the user to view their previous tests via the "Review Tests" page**. This page is supposed to display all of the user's previous tests and allow them to review each test (i.e. their answers for each question, the correct answer for each question, the standard being tested for each question, and their overall grade on the test)
    - The user should also be able to **resume paused tests** from this page (i.e. hop back into a previous testing session), if this functionality is desired
- The **test timer**, which is displayed when a user is taking a test and offers them a visual cue as to how much time they have remaining for their test, does not pause and resume correctly.

These bugs are explained further on the *Issues* page (https://github.com/CEN3031-Project-9C/PK-Yonge-App/issues).

## Unstarted Features
- Test question types
    - Drag-and-drop
    - Graphing
- Test-taking features
    - Line reader
    - Zoom in and out
- Allow the user to take the test as a guest
    - This may only require a "guest" account that the user is automatically logged in to after select to take a test as a guest
- Use WolframAlpha API to render algebric expressions (rather than in plain text)
- Administrative panel for teachers and faculty to create tests, add questions, and manage testing sessions (i.e. provide access to specific students, start and begin the test session, hide/display grades, etc.)

### Screenshots 
Perusing a homepage.

![Homepage](modules/core/client/img/screenshots/homepage.PNG?raw=true)

Reading instructions for the test.

![Instructions](modules/core/client/img/screenshots/instructions.PNG?raw=true)

Signing in.

![Sign in](modules/core/client/img/screenshots/signIn.PNG?raw=true)

Taking a mutiple choice question.

![Test](modules/core/client/img/screenshots/basicTest.PNG?raw=true)

Taking a muti-select question.

![Test](modules/core/client/img/screenshots/checkbox.PNG?raw=true)

Taking a fill in the blank question with calculator.

![Test](modules/core/client/img/screenshots/calculator.PNG?raw=true)

Mark for review feature

![Test](modules/core/client/img/screenshots/mark.PNG?raw=true)

Timer Feature

![Test](modules/core/client/img/screenshots/markNTimer.PNG?raw=true)

Grading a test.

![Test](modules/core/client/img/screenshots/gradeTest.PNG?raw=true)

## Credits

This project uses a number of open source projects to work properly:

* [MEAN Stack](http://mean.io/#!/) - MongoDB, Express, Angular, and Node
* [AngularJS] - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [MongoDB](https://www.mongodb.org/) - NoSQL Database 
* [jQuery] - For basic Javascript functionalities
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [ThomPorter](http://www.thomporter.com/apps/angularjs_calc) - Calculator used in the app

And of course PK-Yonge-App itself is lives on this [public repository](https://github.com/CEN3031-Project-9C/PK-Yonge-App)
 on GitHub.