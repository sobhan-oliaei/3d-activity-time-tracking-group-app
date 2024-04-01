const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var cors = require('cors')
const port = process.env.PORT || 80
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));
const fs = require('fs');
let jalaali = require('jalaali-js');
let CryptoJS = require("crypto-js");


/**
* Login form confirmation function
*/
app.get('/login', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[CryptoJS.HmacSHA1(req.query.user, "sobhani3sgood").toString()]) {
            if (fileObject[CryptoJS.HmacSHA1(req.query.user, "sobhani3sgood").toString()]['password'] == CryptoJS.HmacSHA1(req.query.pass, "sobhani3sgood").toString()) {
                let userObject = {
                    user: CryptoJS.HmacSHA1(req.query.user, "sobhani3sgood").toString(),
                    message: 'logged in'
                }
                res.send(JSON.stringify(userObject));
            }
        }
      });
    }
})


/**
* register form confirmation function
*/
app.get('/register', (req, res) => {
    if (fs.existsSync('users5809.txt')) {
        fs.readFile("users5809.txt", 'utf8', function(err, data) {
            if (err) throw err;
            let fileObject = JSON.parse(data);
            if (typeof fileObject === 'object') {
                if (!fileObject[CryptoJS.HmacSHA1(req.query.username, "sobhani3sgood").toString()]) {
                    let newUser = {};
                    newUser.username = req.query.username;
                    newUser.password = CryptoJS.HmacSHA1(req.query.password, "sobhani3sgood").toString();
                    newUser.email = req.query.email;
                    newUser.number = req.query.number;
                    newUser.group = "none";
                    fileObject[CryptoJS.HmacSHA1(newUser.username, "sobhani3sgood").toString()] = newUser;
                    fs.writeFile("users5809.txt", JSON.stringify(fileObject,null,2), (err) => {
                        if (err)
                          console.log(err);
                        else {
                            res.send("user registered");
                        }
                      });
                }
                else {
                    console.log('username already exists');
                }
            }
            else {
                console.log("file was not an object.");
            }
          });
    }
    else {
        fs.writeFile('users5809.txt', '{}', function (err) {
            if (err) throw err;
            console.log('users5809 created! try again');
          });
    }
})


/**
* create files and empty data for a group in server
*/
app.get('/creategroupid', (req, res) => {
    if (fs.existsSync('groups8535.txt')) {
        fs.readFile("groups8535.txt", 'utf8', function(err, data) {
            if (err) throw err;
            let fileObject = JSON.parse(data);
            if (typeof fileObject === 'object') {
                    let newGroup = {};
                    newGroup.name = req.query.groupname;
                    newGroup.creator = req.query.groupcreator;
                    let randNumber = Math.floor(Math.random() * (99999 - 10000) + 10000);
                    newGroup.code = "c" + String(randNumber);
                    while (fs.existsSync('groups9843/' + newGroup.code)) {
                        randNumber = Math.floor(Math.random() * (99999 - 10000) + 10000);
                        newGroup.code = "c" + String(randNumber);
                    }
                    fs.mkdirSync('groups9843/' + newGroup.code);
                    fs.writeFile('groups9843/' + newGroup.code + "/room.txt", '{}', function (err) {
                        if (err) throw err;
                      });
                      fs.writeFile('groups9843/' + newGroup.code + "/characters.txt", '{}', function (err) {
                        if (err) throw err;
                      });
                      fs.writeFile('groups9843/' + newGroup.code + "/mofidhistory.txt", '{}', function (err) {
                        if (err) throw err;
                      });
                      fs.writeFile('groups9843/' + newGroup.code + "/sessions.txt", '{}', function (err) {
                        if (err) throw err;
                      });
                      fs.writeFile('groups9843/' + newGroup.code + "/tasks.txt", '{}', function (err) {
                        if (err) throw err;
                      });
                      fs.writeFile('groups9843/' + newGroup.code + "/group.txt", '{}', function (err) {
                        if (err) throw err;
                      });
                    fileObject[newGroup.code] = newGroup;
                    fs.readFile("users5809.txt", 'utf8', function(err, data) {
                        if (err) throw err;
                        let fileObject2 = JSON.parse(data);
                        if (typeof fileObject2 === 'object') {
                            fileObject2[newGroup.creator]['group'] = newGroup.code;
                                fs.writeFile("users5809.txt", JSON.stringify(fileObject2,null,2), (err) => {
                                    if (err)
                                      console.log(err);
                                    else {
                                        fs.writeFile("groups8535.txt", JSON.stringify(fileObject,null,2), (err) => {
                                            if (err)
                                              console.log(err);
                                            else {
                                                res.send({message:"group created", groupcode:newGroup.code});
                                            }
                                          });
                                    }
                                  });
                        }
                      });
            }
            else {
                console.log("file was not an object.");
            }
          });
    }
    else {
        fs.writeFile('groups8535.txt', '{}', function (err) {
            if (err) throw err;
            console.log('groups8535 created! try again');
          });
    }
})


/**
* check if a group exists in list
*/
app.get('/checkisgroup', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
        fs.readFile("users5809.txt", 'utf8', function(err, data) {
            if (err) throw err;
            let fileObject = JSON.parse(data);
            if (fileObject[req.query.user]) {
                if (fileObject[req.query.user]['group']) {
                    if (fileObject[req.query.user]['group'] != 'none') {
                        res.send("yes");
                    }
                    else {
                        res.send("no");
                    }
                }
                else {
                    res.send("no");
                }
            }
          });
    }
})


/**
* create new session for a user
*/
app.get('/addNewSession', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/sessions.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    fileObject[req.query.user] = {
                        user: req.query.user,
                        startTime: new Date(),
                        isInProccess: true,
                        endTime: null,
                        task: req.query.task
                    }
                    fileObject = JSON.stringify(fileObject,null,2);
                    fs.writeFile("groups9843/" + groupCode + "/sessions.txt", fileObject, (err) => {
                        if (err)
                          console.log(err);
                        else {
                            res.send("session added");
                        }
                      });
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* save an active session for a user in files
*/
app.get('/saveOldSession', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/sessions.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (fileObject[req.query.user]) {
                        let sessionDuration = () =>{
                            let minute = 1000 * 60;
                            let hour = minute * 60;
                            let endTime = new Date();
                            diffInMS = endTime.getTime() - new Date(fileObject[req.query.user]['startTime']);
                            let hoursDuration = Math.floor(diffInMS / hour);
                            let minuteDuration = (diffInMS % hour) / minute;
                            return {hours: hoursDuration, minutes: minuteDuration, startTime: new Date(fileObject[req.query.user]['startTime']), endTime: endTime, year: new Date(fileObject[req.query.user]['startTime']).getFullYear(), month: new Date(fileObject[req.query.user]['startTime']).getMonth(), day: new Date(fileObject[req.query.user]['startTime']).getDate(), startHour: new Date(fileObject[req.query.user]['startTime']).getHours(), startMinute: new Date(fileObject[req.query.user]['startTime']).getMinutes(), task: fileObject[req.query.user]['task']}
                        }
                        let sessionDurationObj = sessionDuration();
                        fs.readFile("groups9843/" + groupCode + "/mofidhistory.txt", 'utf8', function(err, data) {
                            if (err) throw err;
                            let fileObject2 = JSON.parse(data);
                            if (fileObject2[req.query.user]['mofidPerDay'][String(sessionDurationObj.year) + '-' + String(sessionDurationObj.month) + '-' + String(sessionDurationObj.day)]) {
                                fileObject2[req.query.user]['mofidPerDay'][String(sessionDurationObj.year) + '-' + String(sessionDurationObj.month) + '-' + String(sessionDurationObj.day)].push({startHour:sessionDurationObj.startHour,startMinute:sessionDurationObj.startMinute,hourDuration:sessionDurationObj.hours,minutesDuration:sessionDurationObj.minutes,task:sessionDurationObj.task})
                            }
                            else {
                                fileObject2[req.query.user]['mofidPerDay'][String(sessionDurationObj.year) + '-' + String(sessionDurationObj.month) + '-' + String(sessionDurationObj.day)] = [];
                                fileObject2[req.query.user]['mofidPerDay'][String(sessionDurationObj.year) + '-' + String(sessionDurationObj.month) + '-' + String(sessionDurationObj.day)].push({startHour:sessionDurationObj.startHour,startMinute:sessionDurationObj.startMinute,hourDuration:sessionDurationObj.hours,minutesDuration:sessionDurationObj.minutes,task:sessionDurationObj.task})
                            }
                            fs.writeFile("groups9843/" + groupCode + "/mofidhistory.txt", JSON.stringify(fileObject2,null,2), (err) => {
                                if (err)
                                  console.log(err);
                                else {
                                    fileObject[req.query.user] = null;
                                    fileObject = JSON.stringify(fileObject,null,2);
                                    fs.writeFile("groups9843/" + groupCode + "/sessions.txt", fileObject, (err) => {
                                        if (err)
                                          console.log(err);
                                        else {
                                            res.send("session deleted and saved");
                                        }
                                      });
                                }
                              });
                          });
                    }
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* delete an active session for a user in files
*/
app.get('/deleteOldSession', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/sessions.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (fileObject[req.query.user]) {
                        fileObject[req.query.user] = null;
                        fileObject = JSON.stringify(fileObject,null,2);
                        fs.writeFile("groups9843/" + groupCode + "/sessions.txt", fileObject, (err) => {
                            if (err)
                              console.log(err);
                            else {
                                res.send("session deleted and saved");
                            }
                          });
                    }
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* add new task for a user in files
*/
app.get('/addNewTask', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/tasks.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (!fileObject[req.query.user]) {
                        fileObject[req.query.user] = {
                            task1: {
                                name: req.query.name,
                                weekDays: req.query.weekDays,
                                dates: [],
                                description: req.query.description
                            }
                        }
                    }
                    else {
                        let i;
                        for (i = 1; i <= 20; i++) {
                            if (!fileObject[req.query.user]['task' + String(i)]) {
                                break;
                            }
                          }
                        fileObject[req.query.user]['task' + String(i)] = {
                            name: req.query.name,
                            weekDays: req.query.weekDays,
                            dates: [],
                            description: req.query.description
                        }
                    }
                    fileObject = JSON.stringify(fileObject,null,2);
                    fs.writeFile("groups9843/" + groupCode + "/tasks.txt", fileObject, (err) => {
                        if (err)
                          console.log(err);
                        else {
                            res.send("task added");
                        }
                      });
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* delete an old task for a user in files
*/
app.get('/deleteOldTask', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/tasks.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (fileObject[req.query.user]) {
                        fileObject[req.query.user][req.query.task] = undefined;
                    }
                    fileObject = JSON.stringify(fileObject,null,2);
                    fs.writeFile("groups9843/" + groupCode + "/tasks.txt", fileObject, (err) => {
                        if (err)
                          console.log(err);
                        else {
                            res.send("task deleted");
                        }
                      });
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* get if a user is active or not
*/
app.get('/getIsMofid', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/sessions.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (fileObject[req.query.user]) {
                        let mofidObj = {
                            message: "mofid",
                            time: fileObject[req.query.user]['startTime'],
                            newTime: new Date()
                        }
                        res.send(JSON.stringify(mofidObj));
                    }
                    else {
                        let mofidObj = {
                            message: "not mofid"
                        }
                        res.send(JSON.stringify(mofidObj));
                    }
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }

})


/**
* Get the user's activity list today
*/
app.get('/getMofidToDay', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/mofidhistory.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    let users = {};
                    fs.readFile("groups9843/" + groupCode + "/sessions.txt", 'utf8', function(err2, data2) {
                        if (err2) throw err2;
                        let fileObject2 = JSON.parse(data2);
                    for(let x in fileObject) {
                        users[fileObject[x].showName] = {};
                        users[fileObject[x].showName].id = x;
                        if (fileObject2[x]) {
                            users[fileObject[x].showName]['online'] = 1;
                        }
                        if (fileObject[x].mofidPerDay) {
                            for(let y in fileObject[x].mofidPerDay) {
                                users[fileObject[x].showName][y] = {};
                                users[fileObject[x].showName][y]['hours'] = 0;
                                users[fileObject[x].showName][y]['minutes'] = 0;
                                let eachday = fileObject[x].mofidPerDay[y];
                                for (let aw = 0; aw < eachday.length; aw++) {
                                    users[fileObject[x].showName][y]['hours'] = users[fileObject[x].showName][y]['hours'] + Math.floor(eachday[aw].hourDuration);
                                    users[fileObject[x].showName][y]['minutes'] = users[fileObject[x].showName][y]['minutes'] + Math.floor(eachday[aw].minutesDuration);
                            }
                            }
                        }
                    }
                    res.send(JSON.stringify(users));
                      });
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* Get the user's activity list today for bot
*/
app.get('/mofidToDayApi0fsfjbgwuir5uirwfb3bjfsr', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/mofidhistory.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    let users = {};
                    fs.readFile("groups9843/" + groupCode + "/sessions.txt", 'utf8', function(err2, data2) {
                        if (err2) throw err2;
                        let fileObject2 = JSON.parse(data2);
                    for(let x in fileObject) {
                        users[fileObject[x].showName] = {};
                        users[fileObject[x].showName].id = x;
                        if (fileObject2[x]) {
                            users[fileObject[x].showName]['online'] = 1;
                        }
                        if (fileObject[x].mofidPerDay) {
                            for(let y in fileObject[x].mofidPerDay) {
                                users[fileObject[x].showName][y] = {};
                                users[fileObject[x].showName][y]['hours'] = 0;
                                users[fileObject[x].showName][y]['minutes'] = 0;
                                let eachday = fileObject[x].mofidPerDay[y];
                                for (let aw = 0; aw < eachday.length; aw++) {
                                    users[fileObject[x].showName][y]['hours'] = users[fileObject[x].showName][y]['hours'] + Math.floor(eachday[aw].hourDuration);
                                    users[fileObject[x].showName][y]['minutes'] = users[fileObject[x].showName][y]['minutes'] + Math.floor(eachday[aw].minutesDuration);
                            }
                            }
                        }
                    }
                    res.send(JSON.stringify(users));
                      });
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* Get the user's jobs list today
*/
app.get('/getJobsToDay', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/tasks.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    let toDay = new Date();
                    let toDayTasks = [];
                    if (fileObject[req.query.user]) {
                        let tasks = fileObject[req.query.user];
                        for (let x in tasks) {
                            let days =tasks[x]['weekDays'];
                            days = days.split(',');
                            if (days[toDay.getDay()] == 1) {
                                toDayTasks.push({name: tasks[x]['name'], description: tasks[x]['description']})
                            }
                            else {
                                for(let i = 0; i < tasks[x].dates.length; i++) {
                                    if (tasks[x].dates[String(toDay.getFullYear()) + "-" + String(toDay.getMonth()) + "-" + String(toDay.getDay())]) {
                                    toDayTasks.push({name: tasks[x]['name'], description: tasks[x]['description']})
                                    }
                                }
                            }
                        }
                    }
                    res.send(JSON.stringify(toDayTasks));
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* add new task for a user in files
*/
app.get('/addNewTaskWithDate', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/tasks.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (!fileObject[req.query.user]) {
                        fileObject[req.query.user] = {};
                    }
                    let tasks = fileObject[req.query.user];
                    let theTask;
                    for (let x in tasks) {
                        if (tasks[x]['name'] == req.query.name) {
                            theTask = x;
                        }
                    }
                    if (!theTask) {
                        let i;
                        for (i = 1; i <= 20; i++) {
                            if (!fileObject[req.query.user]['task' + String(i)]) {
                                break;
                            }
                          }
                      tasks['task' + String(i)] = {
                        name: req.query.name,
                        weekDays: '',
                        dates: [],
                        description: req.query.description
                    }
                    theTask = 'task' + String(i);
                    }
                    if (req.query.date) {
                        tasks[theTask]['dates'].push(req.query.date);
                    }
                    else {
                        let time = new Date();
                        time.setDate(time.getDate() + 1);
                        tasks[theTask]['dates'].push(String(time.getFullYear()) + "-" + String(time.getMonth()) + "-" + String(time.getDate()));
                    }
                    fileObject[req.query.user] = tasks;
                    fileObject = JSON.stringify(fileObject,null,2);
                    fs.writeFile("groups9843/" + groupCode + "/tasks.txt", fileObject, (err) => {
                        if (err)
                          console.log(err);
                        else {
                            res.send("task added");
                        }
                      });
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})

/**
* get jobs of a user
*/

app.get('/getJobs', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/tasks.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (fileObject[req.query.user]) {
                        res.send(JSON.stringify(fileObject[req.query.user]));
                    }
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* Get a list of group activities
*/
app.get('/getMofidHistory', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/mofidhistory.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    if (fileObject[req.query.user]['mofidPerDay']) {
                        let daily = [];
                        let i = 0;
                        for(let x in fileObject[req.query.user]['mofidPerDay']) {
                            daily[i] = [];
                            let l = 0;
                            for(let k = 0; k < fileObject[req.query.user]['mofidPerDay'][x].length; k++) {
                                if (fileObject[req.query.user]['mofidPerDay'][x][k]['hourDuration'] >= 1 || fileObject[req.query.user]['mofidPerDay'][x][k]['minutesDuration'] >= 1) {
                                    daily[i][l] = fileObject[req.query.user]['mofidPerDay'][x][k];
                                    daily[i][l]['date'] = x;
                                    l = l + 1;
                                }
                            }
                            if (l == 0) {
                                daily[i][l] = {};
                            }
                            i = i + 1;
                        }
                        let weekly = [];
                        let w = 0;
                        for(let j = 0; j < daily.length; j++) {
                            let dailyHour = 0;
                            let dailyMinute = 0;
                            if (daily[j]) {
                                for(let p = 0; p < daily[j].length; p++) {
                                    dailyHour = dailyHour + daily[j][p]['hourDuration'];
                                    dailyMinute = dailyMinute + daily[j][p]['minutesDuration'];
                                }
                                weekly[w] = {
                                    hourDuration: dailyHour,
                                    minutesDuration: dailyMinute,
                                    date: daily[j][0]['date']
                                }
                                w = w + 1;
                            }
                        }
                        let sendObj = {
                            daily: daily,
                            weekly: weekly
                        }
                        res.send(JSON.stringify(sendObj));
                    }
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* Get a list of group activities for a week
*/
app.get('/getMofidToWeek', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/mofidhistory.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    let weeks = [];
                    let toDay = new Date();
                    let isSuturDay = false;
                    for (let i = 0; i < 3; i++) {
                        while (!isSuturDay) {
                            for (let x in fileObject) {
                                if(fileObject[x]['mofidPerDay']) {
                                    if(fileObject[x]['mofidPerDay'][toDay.getFullYear() + "-" + toDay.getMonth() + "-" + toDay.getDate()]) {
                                        let userDayHours = 0;
                                        let userDayMinutes = 0;
                                        let userDayArray = fileObject[x]['mofidPerDay'][toDay.getFullYear() + "-" + toDay.getMonth() + "-" + toDay.getDate()];
                                        for (let j = 0; j < userDayArray.length; j ++) {
                                            userDayHours = userDayHours + Math.floor(userDayArray[j]['hourDuration']);
                                            userDayMinutes = userDayMinutes + Math.floor(userDayArray[j]['minutesDuration']);
                                        }
                                        if (!weeks[i]) {
                                            weeks[i] = {};
                                        }
                                        if (!weeks[i][fileObject[x]['showName']]) {
                                            weeks[i][fileObject[x]['showName']] = {};
                                        }
                                        if (!weeks[i][fileObject[x]['showName']]['hours'] && !weeks[i][fileObject[x]['showName']]['minutes']) {
                                            weeks[i][fileObject[x]['showName']]['hours'] = 0;
                                            weeks[i][fileObject[x]['showName']]['minutes'] = 0;
                                        }
                                        weeks[i][fileObject[x]['showName']]['hours'] = weeks[i][fileObject[x]['showName']]['hours'] + userDayHours;
                                        weeks[i][fileObject[x]['showName']]['minutes'] = weeks[i][fileObject[x]['showName']]['minutes'] + userDayMinutes;
                                    }
                                }
                            }
                            if (toDay.getDay() == 6) {
                                isSuturDay = true;
                            }
                            toDay.setDate(toDay.getDate() - 1);
                        }
                        toDay.setDate(toDay.getDate() + 1);
                        if (weeks[i]) {
                            weeks[i]['date'] = toDay.getFullYear() + "-" + toDay.getMonth() + "-" + toDay.getDate();
                        }
                        isSuturDay = false;
                        toDay.setDate(toDay.getDate() - 1);
                    }
                    res.send(JSON.stringify(weeks));
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* Get a list of group activities for a month
*/
app.get('/getMofidToMonth', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.user]['group']) {
            if (fileObject[req.query.user]['group'] != 'none') {
                let groupCode = fileObject[req.query.user]['group'];
                fs.readFile("groups9843/" + groupCode + "/mofidhistory.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    let months = [];
                    let toDay = new Date();
                    let isFirstDay = false;
                    for (let i = 0; i < 6; i++) {
                        let aDate = toDay;
                        let jalaliDate = jalaali.toJalaali(aDate.getFullYear(), aDate.getMonth() + 1, aDate.getDate());
                        let jalaliFirstDay = jalaali.toGregorian(jalaliDate.jy, jalaliDate.jm, 1);
                        while (!isFirstDay) {
                            for (let x in fileObject) {
                                if(fileObject[x]['mofidPerDay']) {
                                    if(fileObject[x]['mofidPerDay'][toDay.getFullYear() + "-" + toDay.getMonth() + "-" + toDay.getDate()]) {
                                        let userDayHours = 0;
                                        let userDayMinutes = 0;
                                        let userDayArray = fileObject[x]['mofidPerDay'][toDay.getFullYear() + "-" + toDay.getMonth() + "-" + toDay.getDate()];
                                        for (let j = 0; j < userDayArray.length; j ++) {
                                            userDayHours = userDayHours + Math.floor(userDayArray[j]['hourDuration']);
                                            userDayMinutes = userDayMinutes + Math.floor(userDayArray[j]['minutesDuration']);
                                        }
                                        if (!months[i]) {
                                            months[i] = {};
                                        }
                                        if (!months[i][fileObject[x]['showName']]) {
                                            months[i][fileObject[x]['showName']] = {};
                                        }
                                        if (!months[i][fileObject[x]['showName']]['hours'] && !months[i][fileObject[x]['showName']]['minutes']) {
                                            months[i][fileObject[x]['showName']]['hours'] = 0;
                                            months[i][fileObject[x]['showName']]['minutes'] = 0;
                                        }
                                        months[i][fileObject[x]['showName']]['hours'] = months[i][fileObject[x]['showName']]['hours'] + userDayHours;
                                        months[i][fileObject[x]['showName']]['minutes'] = months[i][fileObject[x]['showName']]['minutes'] + userDayMinutes;
                                    }
                                }
                            }
                            if (toDay.getDate() == jalaliFirstDay.gd) {
                                isFirstDay = true;
                            }
                            toDay.setDate(toDay.getDate() - 1);
                        }
                        if (months[i]) {
                            months[i]['date'] = aDate.getFullYear() + "-" + aDate.getMonth() + "-" + (Number(aDate.getDate()) + 1);
                        }
                        isFirstDay = false;
                        toDay.setDate(toDay.getDate() - 1);
                    }
                    res.send(JSON.stringify(months));
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* Get a list of user jobs name
*/
app.get('/getMofidJobsName', (req, res) => {
    if (fs.existsSync("users5809.txt")) {
    fs.readFile("users5809.txt", 'utf8', function(err, data) {
        if (err) throw err;
        let fileObject = JSON.parse(data);
        if (fileObject[req.query.user]) {
        if (fileObject[req.query.userr]['group']) {
            if (fileObject[req.query.userr]['group'] != 'none') {
                let groupCode = fileObject[req.query.userr]['group'];
                fs.readFile("groups9843/" + groupCode + "/mofidhistory.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    let fileObject = JSON.parse(data);
                    let wantedUser = req.query.user;
                    if (fileObject[wantedUser]['mofidPerDay']) {
                        let daily = [];
                        let i = 0;
                        for(let x in fileObject[wantedUser]['mofidPerDay']) {
                            daily[i] = [];
                            let l = 0;
                            for(let k = 0; k < fileObject[wantedUser]['mofidPerDay'][x].length; k++) {
                                if (fileObject[wantedUser]['mofidPerDay'][x][k]['hourDuration'] >= 1 || fileObject[wantedUser]['mofidPerDay'][x][k]['minutesDuration'] >= 1) {
                                    daily[i][l] = fileObject[wantedUser]['mofidPerDay'][x][k];
                                    daily[i][l]['date'] = x;
                                    l = l + 1;
                                }
                            }
                            if (l == 0) {
                                daily[i][l] = {};
                            }
                            i = i + 1;
                        }
                        let sendObj = {
                            daily: daily
                        }
                        res.send(JSON.stringify(sendObj));
                    }
                  });
            }
            else {
                console.log("can't find any group");
            }
        }
        else {
            console.log("can't find any group");
        }
    }
      });
    }
})


/**
* run the react
*/
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})