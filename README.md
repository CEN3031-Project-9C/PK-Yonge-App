# PK-Yonge-App
A web-based application that allows students at [PK Yonge Developmental Research School](http://pkyonge.ufl.edu/) (in Gainesville, FL) to practice for their end-of-course exams.
This application is being made in an Introduction to Software Engineering (CEN3031) class at the University of Florida, and was created using the MEAN framework.

## Deployed Site: http://pky-eoc.herokuapp.com/
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


### Features
Currently, there are a few things you can do on this application, including:
- Properly having users signing-in and have a method of retrieving forgotten password.
- Test portal and its sub-features are only accessible once the users are logged in.
- Test Taking
- Grade test

#### Test Portal Features
- A basic four function calculator
- Formula Sheet
- Navigation between different questions 
- Notepad that properly stores notes for every individual question
- Mark for review and that will be reflected in the drop down navigation, and on the individual questions.
- Pop-up warnings when navigating between questions without answering. 
- Pop-up warnings when there are questions unanswered when submitting the test. 
- Pop-up warnings when time is up. 


### Screenshots 
Perusing a homepage.

![Homepage](modules/core/client/img/screenshots/homepage.PNG?raw=true)

Reading instructions for the test.

![Instructions](modules/core/client/img/screenshots/instructions.PNG?raw=true)

Signing in.

![Sign in](modules/core/client/img/screenshots/signIn.PNG?raw=true)

Taking a practice test.

![Test](modules/core/client/img/screenshots/basicTest.PNG?raw=true)

Grading a test.

![Test](modules/core/client/img/screenshots/gradeTest.PNG?raw=true)

## Suggested Features to be implemented
- Implement posted issues/ffeatures on Github 
- Use WolframAlpha API to show algebric expression 

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
