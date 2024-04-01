import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';
let jalaali = require('jalaali-js');

/**
* A class to display the list of group users' points on the wall of the room
*/
class score_board {
    /**
    * A function to create display the list of group users' points on the wall of the room
    */
    create = (scene, controlRects, serverAdrs, cookies) => {
        let advancedTexture3 = GUI
        .AdvancedDynamicTexture
        .CreateForMesh(scene.getMeshByName('scoreboard'));
    let rect1 = new GUI.Rectangle();
    rect1.cornerRadius = 20;
    rect1.height = "1000px";
    rect1.width = "700px";
    rect1.color = "Orange";
    rect1.thickness = 4;
    rect1.background = "white";
    advancedTexture3.addControl(rect1);
    let text1 = new GUI.TextBlock();
    text1.height = "80px";
    text1.topInPixels = -435;
    text1.color = "orange";
    text1.fontSize = 60;
    text1.text = "عملکرد دوستان"
    rect1.addControl(text1);
    let paramsToSend = new URLSearchParams();
    paramsToSend.append("user", cookies.userid);
    axios
        .get(serverAdrs + `/getMofidToDay?` + paramsToSend.toString())
        .then(res => {
            let data = res.data;
            let newDate1 = new Date();
            let scoreB = this.scoreBoard(scene,controlRects,serverAdrs,rect1,data,newDate1, cookies);
            text1
                .onPointerClickObservable
                .add(() => {
                    for (let i = 1; i < scoreB.length; i++) {
                        scoreB[i].dispose();
                    }
                    for (let i = 0; i < scoreB[0].length; i++) {
                        scoreB[0][i][0].dispose();
                        scoreB[0][i][1].dispose();
                        scoreB[0][i][2].dispose();
                    }
                    scoreB = this.scoreBoard(scene,controlRects,serverAdrs,rect1,data,newDate1, cookies);
                })
        });
    }

    /**
    * A function to display and sort user scores
    */
    scoreBoard = (scene, controlRects, serverAdrs, rect1, data, newDate1, cookies) => {
        let scoreMeshes = [];
        let text9 = new GUI.TextBlock();
        text9.height = "60px";
        text9.width = "190px";
        text9.topInPixels = -370;
        text9.color = "black";
        text9.fontSize = 38;
        let perDate1 = jalaali.toJalaali(
            newDate1.getFullYear(),
            newDate1.getMonth() + 1,
            newDate1.getDate()
        );
        text9.text = perDate1.jy + "-" + perDate1.jm + "-" + perDate1.jd;
        rect1.addControl(text9);
        let text10 = new GUI.TextBlock();
        text10.height = "60px";
        text10.width = "20px";
        text10.topInPixels = -370;
        text10.leftInPixels = 110;
        text10.color = "black";
        text10.fontSize = 38;
        text10.text = ">";
        text10
            .onPointerClickObservable
            .add(() => {
                for (let c = 0; c < scoreMeshes.length; c++) {
                    scoreMeshes[c][0].dispose();
                    scoreMeshes[c][1].dispose();
                    scoreMeshes[c][2].dispose();
                }
                newDate1.setDate(newDate1.getDate() + 1);
                let perDate1 = jalaali.toJalaali(
                    newDate1.getFullYear(),
                    newDate1.getMonth() + 1,
                    newDate1.getDate()
                );
                text9.text = perDate1.jy + "-" + perDate1.jm + "-" + perDate1.jd;
                let i = 0;
                data = Object.fromEntries(Object.entries(data).sort((a, b) => {
                    if (!b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                    if (!a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                        return ((b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']) - (a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']));
                }));
                for (let x in data) {
                    if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] != 0 || data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] != 0) {
                            let dailyMeshes = [];
                            scoreMeshes[i] = [];
                            scoreMeshes[i][0] = new GUI.Rectangle();
                            scoreMeshes[i][0].cornerRadius = 20;
                            scoreMeshes[i][0].height = "100px";
                            scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                            scoreMeshes[i][0].width = "650px";
                            scoreMeshes[i][0].color = "Orange";
                            scoreMeshes[i][0].thickness = 4;
                            scoreMeshes[i][0].background = "white";
                            scoreMeshes[i][0].onPointerClickObservable.add(()=>{
                                this.showHistory(scene,controlRects,serverAdrs,data[x].id,dailyMeshes, cookies);
                            })
                            rect1.addControl(scoreMeshes[i][0]);
                            scoreMeshes[i][1] = new GUI.TextBlock();
                            scoreMeshes[i][1].width = "180px";
                            scoreMeshes[i][1].height = "90px";
                            scoreMeshes[i][1].leftInPixels = 210;
                            scoreMeshes[i][1].color = "black";
                            if (data[x].online == 1) {
                                scoreMeshes[i][1].color = "green";
                            }
                            scoreMeshes[i][1].fontSize = 50;
                            scoreMeshes[i][1].text = x;
                            scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                            scoreMeshes[i][2] = new GUI.TextBlock();
                            scoreMeshes[i][2].width = "380px";
                            scoreMeshes[i][2].height = "90px";
                            scoreMeshes[i][2].leftInPixels = -130;
                            scoreMeshes[i][2].color = "black";
                            scoreMeshes[i][2].fontSize = 38;
                            let thisUser = data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                    newDate1.getDate()
                                )];
                            while (thisUser['minutes'] / 60 >= 1) {
                                thisUser['hours'] = thisUser['hours'] + 1;
                                thisUser['minutes'] = thisUser['minutes'] - 60;
                            }
                            scoreMeshes[i][2].text = " امروز " + thisUser['hours'] + " ساعت و " +
                                    thisUser['minutes'] + " دقیقه";
                            scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                            i = i + 1;
                        }
                    }
                }
            });
        rect1.addControl(text10);
        let text11 = new GUI.TextBlock();
        text11.height = "60px";
        text11.width = "20px";
        text11.topInPixels = -370;
        text11.leftInPixels = 140;
        text11.color = "black";
        text11.fontSize = 38;
        text11.text = ">";
        text11
            .onPointerClickObservable
            .add(() => {
                for (let c = 0; c < scoreMeshes.length; c++) {
                    scoreMeshes[c][0].dispose();
                    scoreMeshes[c][1].dispose();
                    scoreMeshes[c][2].dispose();
                }
                newDate1.setMonth(newDate1.getMonth() + 1);
                let perDate1 = jalaali.toJalaali(
                    newDate1.getFullYear(),
                    newDate1.getMonth() + 1,
                    newDate1.getDate()
                );
                text9.text = perDate1.jy + "-" + perDate1.jm + "-" + perDate1.jd;
                let i = 0;
                data = Object.fromEntries(Object.entries(data).sort((a, b) => {
                    if (!b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                    if (!a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                        return ((b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']) - (a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']));
                }));
                for (let x in data) {
                    if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] != 0 || data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] != 0) {
                        let dailyMeshes = [];
                        scoreMeshes[i] = [];
                        scoreMeshes[i][0] = new GUI.Rectangle();
                        scoreMeshes[i][0].cornerRadius = 20;
                        scoreMeshes[i][0].height = "100px";
                        scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                        scoreMeshes[i][0].width = "650px";
                        scoreMeshes[i][0].color = "Orange";
                        scoreMeshes[i][0].thickness = 4;
                        scoreMeshes[i][0].background = "white";
                        scoreMeshes[i][0].onPointerClickObservable.add(()=>{
                            this.showHistory(scene,controlRects,serverAdrs,data[x].id,dailyMeshes, cookies);
                        })
                        rect1.addControl(scoreMeshes[i][0]);
                        scoreMeshes[i][1] = new GUI.TextBlock();
                        scoreMeshes[i][1].width = "180px";
                        scoreMeshes[i][1].height = "90px";
                        scoreMeshes[i][1].leftInPixels = 210;
                        scoreMeshes[i][1].color = "black";
                        if (data[x].online == 1) {
                            scoreMeshes[i][1].color = "green";
                        }
                        scoreMeshes[i][1].fontSize = 50;
                        scoreMeshes[i][1].text = x;
                        scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                        scoreMeshes[i][2] = new GUI.TextBlock();
                        scoreMeshes[i][2].width = "380px";
                        scoreMeshes[i][2].height = "90px";
                        scoreMeshes[i][2].leftInPixels = -130;
                        scoreMeshes[i][2].color = "black";
                        scoreMeshes[i][2].fontSize = 38;
                        let thisUser = data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )];
                        while (thisUser['minutes'] / 60 >= 1) {
                            thisUser['hours'] = thisUser['hours'] + 1;
                            thisUser['minutes'] = thisUser['minutes'] - 60;
                        }
                        scoreMeshes[i][2].text = " امروز " + thisUser['hours'] + " ساعت و " +
                                thisUser['minutes'] + " دقیقه";
                        scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                        i = i + 1;
                    }
                    }
                }
            });
        rect1.addControl(text11);
        let text12 = new GUI.TextBlock();
        text12.height = "60px";
        text12.width = "20px";
        text12.topInPixels = -370;
        text12.leftInPixels = -110;
        text12.color = "black";
        text12.fontSize = 38;
        text12.text = "<";
        text12
            .onPointerClickObservable
            .add(() => {
                for (let c = 0; c < scoreMeshes.length; c++) {
                    scoreMeshes[c][0].dispose();
                    scoreMeshes[c][1].dispose();
                    scoreMeshes[c][2].dispose();
                }
                newDate1.setDate(newDate1.getDate() - 1);
                let perDate1 = jalaali.toJalaali(
                    newDate1.getFullYear(),
                    newDate1.getMonth() + 1,
                    newDate1.getDate()
                );
                text9.text = perDate1.jy + "-" + perDate1.jm + "-" + perDate1.jd;
                let i = 0;
                data = Object.fromEntries(Object.entries(data).sort((a, b) => {
                    if (!b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                    if (!a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                        return ((b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']) - (a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']));
                }));
                for (let x in data) {
                    if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] != 0 || data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] != 0) {
                        let dailyMeshes = [];
                        scoreMeshes[i] = [];
                        scoreMeshes[i][0] = new GUI.Rectangle();
                        scoreMeshes[i][0].cornerRadius = 20;
                        scoreMeshes[i][0].height = "100px";
                        scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                        scoreMeshes[i][0].width = "650px";
                        scoreMeshes[i][0].color = "Orange";
                        scoreMeshes[i][0].thickness = 4;
                        scoreMeshes[i][0].background = "white";
                        scoreMeshes[i][0].onPointerClickObservable.add(()=>{
                            this.showHistory(scene,controlRects,serverAdrs,data[x].id, dailyMeshes, cookies);
                        })
                        rect1.addControl(scoreMeshes[i][0]);
                        scoreMeshes[i][1] = new GUI.TextBlock();
                        scoreMeshes[i][1].width = "180px";
                        scoreMeshes[i][1].height = "90px";
                        scoreMeshes[i][1].leftInPixels = 210;
                        scoreMeshes[i][1].color = "black";
                        if (data[x].online == 1) {
                            scoreMeshes[i][1].color = "green";
                        }
                        scoreMeshes[i][1].fontSize = 50;
                        scoreMeshes[i][1].text = x;
                        scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                        scoreMeshes[i][2] = new GUI.TextBlock();
                        scoreMeshes[i][2].width = "380px";
                        scoreMeshes[i][2].height = "90px";
                        scoreMeshes[i][2].leftInPixels = -130;
                        scoreMeshes[i][2].color = "black";
                        scoreMeshes[i][2].fontSize = 38;
                        let thisUser = data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )];
                        while (thisUser['minutes'] / 60 >= 1) {
                            thisUser['hours'] = thisUser['hours'] + 1;
                            thisUser['minutes'] = thisUser['minutes'] - 60;
                        }
                        scoreMeshes[i][2].text = " امروز " + thisUser['hours'] + " ساعت و " +
                                thisUser['minutes'] + " دقیقه";
                        scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                        i = i + 1;
                    }
                    }
                }
            });
        rect1.addControl(text12);
        let text13 = new GUI.TextBlock();
        text13.height = "60px";
        text13.width = "20px";
        text13.topInPixels = -370;
        text13.leftInPixels = -140;
        text13.color = "black";
        text13.fontSize = 38;
        text13.text = "<";
        text13
            .onPointerClickObservable
            .add(() => {
                for (let c = 0; c < scoreMeshes.length; c++) {
                    scoreMeshes[c][0].dispose();
                    scoreMeshes[c][1].dispose();
                    scoreMeshes[c][2].dispose();
                }
                newDate1.setMonth(newDate1.getMonth() - 1);
                let perDate1 = jalaali.toJalaali(
                    newDate1.getFullYear(),
                    newDate1.getMonth() + 1,
                    newDate1.getDate()
                );
                text9.text = perDate1.jy + "-" + perDate1.jm + "-" + perDate1.jd;
                let i = 0;
                data = Object.fromEntries(Object.entries(data).sort((a, b) => {
                    if (!b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                    if (!a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                        a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
                    }
                        return ((b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']) - (a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['hours'] * 60 + a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )]['minutes']));
                }));
                for (let x in data) {
                    if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                        if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] != 0 || data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] != 0) {
                        let dailyMeshes = [];
                        scoreMeshes[i] = [];
                        scoreMeshes[i][0] = new GUI.Rectangle();
                        scoreMeshes[i][0].cornerRadius = 20;
                        scoreMeshes[i][0].height = "100px";
                        scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                        scoreMeshes[i][0].width = "650px";
                        scoreMeshes[i][0].color = "Orange";
                        scoreMeshes[i][0].thickness = 4;
                        scoreMeshes[i][0].background = "white";
                        scoreMeshes[i][0].onPointerClickObservable.add(()=>{
                            this.showHistory(scene,controlRects,serverAdrs,data[x].id, dailyMeshes, cookies);
                        })
                        rect1.addControl(scoreMeshes[i][0]);
                        scoreMeshes[i][1] = new GUI.TextBlock();
                        scoreMeshes[i][1].width = "180px";
                        scoreMeshes[i][1].height = "90px";
                        scoreMeshes[i][1].leftInPixels = 210;
                        scoreMeshes[i][1].color = "black";
                        if (data[x].online == 1) {
                            scoreMeshes[i][1].color = "green";
                        }
                        scoreMeshes[i][1].fontSize = 50;
                        scoreMeshes[i][1].text = x;
                        scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                        scoreMeshes[i][2] = new GUI.TextBlock();
                        scoreMeshes[i][2].width = "380px";
                        scoreMeshes[i][2].height = "90px";
                        scoreMeshes[i][2].leftInPixels = -130;
                        scoreMeshes[i][2].color = "black";
                        scoreMeshes[i][2].fontSize = 38;
                        let thisUser = data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                                newDate1.getDate()
                            )];
                        while (thisUser['minutes'] / 60 >= 1) {
                            thisUser['hours'] = thisUser['hours'] + 1;
                            thisUser['minutes'] = thisUser['minutes'] - 60;
                        }
                        scoreMeshes[i][2].text = " امروز " + thisUser['hours'] + " ساعت و " +
                                thisUser['minutes'] + " دقیقه";
                        scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                        i = i + 1;
                    }
                    }
                }
            });
        rect1.addControl(text13);
        let i = 0;
        data = Object.fromEntries(Object.entries(data).sort((a, b) => {
            if (!b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
            }
            if (!a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())] = {};
                a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] = 0;
                a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] = 0;
            }
                return ((b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                        newDate1.getDate()
                    )]['hours'] * 60 + b[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                        newDate1.getDate()
                    )]['minutes']) - (a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                        newDate1.getDate()
                    )]['hours'] * 60 + a[1][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                        newDate1.getDate()
                    )]['minutes']));
        }));
        for (let x in data) {
            if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]) {
                if (data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['hours'] != 0 || data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (newDate1.getDate())]['minutes'] != 0) {
                let dailyMeshes = [];
                scoreMeshes[i] = [];
                scoreMeshes[i][0] = new GUI.Rectangle();
                scoreMeshes[i][0].cornerRadius = 20;
                scoreMeshes[i][0].height = "100px";
                scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                scoreMeshes[i][0].width = "650px";
                scoreMeshes[i][0].color = "Orange";
                scoreMeshes[i][0].thickness = 4;
                scoreMeshes[i][0].background = "white";
                scoreMeshes[i][0].onPointerClickObservable.add(()=>{
                    this.showHistory(scene,controlRects,serverAdrs,data[x].id, dailyMeshes, cookies);
                })
                rect1.addControl(scoreMeshes[i][0]);
                scoreMeshes[i][1] = new GUI.TextBlock();
                scoreMeshes[i][1].width = "180px";
                scoreMeshes[i][1].height = "90px";
                scoreMeshes[i][1].leftInPixels = 210;
                scoreMeshes[i][1].color = "black";
                if (data[x].online == 1) {
                    scoreMeshes[i][1].color = "green";
                }
                scoreMeshes[i][1].fontSize = 50;
                scoreMeshes[i][1].text = x;
                scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                scoreMeshes[i][2] = new GUI.TextBlock();
                scoreMeshes[i][2].width = "380px";
                scoreMeshes[i][2].height = "90px";
                scoreMeshes[i][2].leftInPixels = -130;
                scoreMeshes[i][2].color = "black";
                scoreMeshes[i][2].fontSize = 38;
                let thisUser = data[x][newDate1.getFullYear() + "-" + newDate1.getMonth() + "-" + (
                        newDate1.getDate()
                    )];
                while (thisUser['minutes'] / 60 >= 1) {
                    thisUser['hours'] = thisUser['hours'] + 1;
                    thisUser['minutes'] = thisUser['minutes'] - 60;
                }
                scoreMeshes[i][2].text = " امروز " + thisUser['hours'] + " ساعت و " +
                        thisUser['minutes'] + " دقیقه";
                scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                i = i + 1;
            }
            }
        }
        // **** پایان نمایش روزانه مفیدیت اعضا ****
        // **** شروع نمایش هفتگی مفیدیت اعضا ****
        let text14 = new GUI.TextBlock();
        text14.height = "50px";
        text14.topInPixels = -390;
        text14.leftInPixels = -260;
        text14.width = "95px"
        text14.color = "green";
        text14.fontSize = 42;
        text14.text = "هفتگی";
        text14
            .onPointerClickObservable
            .add(() => {
                let paramsToSend = new URLSearchParams();
                paramsToSend.append("user", cookies.userid);
                axios
                    .get(serverAdrs + `/getMofidToWeek?` + paramsToSend.toString())
                    .then(res => {
                        let data2 = res.data;
                        text14.color = "brown";
                        for (let c = 0; c < scoreMeshes.length; c++) {
                            scoreMeshes[c][0].dispose();
                            scoreMeshes[c][1].dispose();
                            scoreMeshes[c][2].dispose();
                        }
                        let perDateArray = data2[0]['date'].split("-");
                        let perDate1 = jalaali.toJalaali(
                            Number(perDateArray[0]),
                            Number(perDateArray[1]) + 1,
                            Number(perDateArray[2])
                        );
                        text9.text = perDate1.jy + "-" + perDate1.jm + "-" + perDate1.jd;
                        text10.dispose();
                        text11.dispose();
                        text12.dispose();
                        text13.dispose();
                        text10 = new GUI.TextBlock();
                        text10.height = "60px";
                        text10.width = "20px";
                        text10.topInPixels = -370;
                        text10.leftInPixels = 110;
                        text10.color = "black";
                        text10.fontSize = 38;
                        text10.text = ">";
                        text10.onPointerClickObservable.add(()=>{
                            if (k != 0) {
                                i = 0;
                                k = k - 1;
                                let perDateArray2 = data2[k]['date'].split("-");
                                let perDate2 = jalaali.toJalaali(
                                    Number(perDateArray2[0]),
                                    Number(perDateArray2[1]) + 1,
                                    Number(perDateArray2[2])
                                );
                                text9.text = perDate2.jy + "-" + perDate2.jm + "-" + perDate2.jd;
                                for (let c = 0; c < scoreMeshes.length; c++) {
                                    scoreMeshes[c][0].dispose();
                                    scoreMeshes[c][1].dispose();
                                    scoreMeshes[c][2].dispose();
                                }
                                data2[k] = Object.fromEntries(Object.entries(data2[k]).sort((a, b) => {
                                    if ((b[1]['minutes'] || b[1]['hours']) && (a[1]['minutes'] || a[1]['hours'])) {
                                        return (
                                            (b[1]['hours'] * 60 + b[1]['minutes']) - (a[1]['hours'] * 60 + a[1]['minutes'])
                                        );
                                    } else {
                                        return (b[1] - a[1]);
                                    }
                                }));
                                for (let x in data2[k]) {
                                    if (x != "date") {
                                        scoreMeshes[i] = [];
                                        scoreMeshes[i][0] = new GUI.Rectangle();
                                        scoreMeshes[i][0].cornerRadius = 20;
                                        scoreMeshes[i][0].height = "100px";
                                        scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                                        scoreMeshes[i][0].width = "650px";
                                        scoreMeshes[i][0].color = "Orange";
                                        scoreMeshes[i][0].thickness = 4;
                                        scoreMeshes[i][0].background = "white";
                                        rect1.addControl(scoreMeshes[i][0]);
                                        scoreMeshes[i][1] = new GUI.TextBlock();
                                        scoreMeshes[i][1].width = "180px";
                                        scoreMeshes[i][1].height = "90px";
                                        scoreMeshes[i][1].leftInPixels = 210;
                                        scoreMeshes[i][1].color = "black";
                                        scoreMeshes[i][1].fontSize = 50;
                                        scoreMeshes[i][1].text = x;
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                                        scoreMeshes[i][2] = new GUI.TextBlock();
                                        scoreMeshes[i][2].width = "380px";
                                        scoreMeshes[i][2].height = "90px";
                                        scoreMeshes[i][2].leftInPixels = -130;
                                        scoreMeshes[i][2].color = "black";
                                        scoreMeshes[i][2].fontSize = 38;
                                        let thisWeek = data2[k];
                                        while (thisWeek[x]['minutes'] / 60 >= 1) {
                                            thisWeek[x]['hours'] = thisWeek[x]['hours'] + 1;
                                            thisWeek[x]['minutes'] = thisWeek[x]['minutes'] - 60;
                                        }
                                        scoreMeshes[i][2].text = " درهفته " + thisWeek[x]['hours'] + " ساعت و " +
                                                thisWeek[x]['minutes'] + " دقیقه";
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                                        i = i + 1;
                                    }
                                }
                            }
                        });
                        rect1.addControl(text10);
                        text12 = new GUI.TextBlock();
                        text12.height = "60px";
                        text12.width = "20px";
                        text12.topInPixels = -370;
                        text12.leftInPixels = -110;
                        text12.color = "black";
                        text12.fontSize = 38;
                        text12.text = "<";
                        text12.onPointerClickObservable.add(()=>{
                            if(data2[k + 1]) {
                                k = k + 1;
                                i = 0;
                                let perDateArray2 = data2[k]['date'].split("-");
                                let perDate2 = jalaali.toJalaali(
                                    Number(perDateArray2[0]),
                                    Number(perDateArray2[1]) + 1,
                                    Number(perDateArray2[2])
                                );
                                text9.text = perDate2.jy + "-" + perDate2.jm + "-" + perDate2.jd;
                                for (let c = 0; c < scoreMeshes.length; c++) {
                                    scoreMeshes[c][0].dispose();
                                    scoreMeshes[c][1].dispose();
                                    scoreMeshes[c][2].dispose();
                                }
                                data2[k] = Object.fromEntries(Object.entries(data2[k]).sort((a, b) => {
                                    if ((b[1]['minutes'] || b[1]['hours']) && (a[1]['minutes'] || a[1]['hours'])) {
                                        return (
                                            (b[1]['hours'] * 60 + b[1]['minutes']) - (a[1]['hours'] * 60 + a[1]['minutes'])
                                        );
                                    } else {
                                        return (b[1] - a[1]);
                                    }
                                }));
                                for (let x in data2[k]) {
                                    if (x != "date") {
                                        scoreMeshes[i] = [];
                                        scoreMeshes[i][0] = new GUI.Rectangle();
                                        scoreMeshes[i][0].cornerRadius = 20;
                                        scoreMeshes[i][0].height = "100px";
                                        scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                                        scoreMeshes[i][0].width = "650px";
                                        scoreMeshes[i][0].color = "Orange";
                                        scoreMeshes[i][0].thickness = 4;
                                        scoreMeshes[i][0].background = "white";
                                        rect1.addControl(scoreMeshes[i][0]);
                                        scoreMeshes[i][1] = new GUI.TextBlock();
                                        scoreMeshes[i][1].width = "180px";
                                        scoreMeshes[i][1].height = "90px";
                                        scoreMeshes[i][1].leftInPixels = 210;
                                        scoreMeshes[i][1].color = "black";
                                        scoreMeshes[i][1].fontSize = 50;
                                        scoreMeshes[i][1].text = x;
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                                        scoreMeshes[i][2] = new GUI.TextBlock();
                                        scoreMeshes[i][2].width = "380px";
                                        scoreMeshes[i][2].height = "90px";
                                        scoreMeshes[i][2].leftInPixels = -130;
                                        scoreMeshes[i][2].color = "black";
                                        scoreMeshes[i][2].fontSize = 38;
                                        let thisWeek = data2[k];
                                        while (thisWeek[x]['minutes'] / 60 >= 1) {
                                            thisWeek[x]['hours'] = thisWeek[x]['hours'] + 1;
                                            thisWeek[x]['minutes'] = thisWeek[x]['minutes'] - 60;
                                        }
                                        scoreMeshes[i][2].text = " درهفته " + thisWeek[x]['hours'] + " ساعت و " +
                                                thisWeek[x]['minutes'] + " دقیقه";
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                                        i = i + 1;
                                    }
                                }
                            }
                        });
                        rect1.addControl(text12);
                        let i = 0;
                        let k = 0;
                        data2[k] = Object.fromEntries(Object.entries(data2[k]).sort((a, b) => {
                            if (b[1]['minutes'] && a[1]['minutes']) {
                                return (
                                    (b[1]['hours'] * 60 + b[1]['minutes']) - (a[1]['hours'] * 60 + a[1]['minutes'])
                                );
                            } else {
                                return (b[1] - a[1]);
                            }
                        }));
                        for (let x in data2[k]) {
                            if (x != "date") {
                                scoreMeshes[i] = [];
                                scoreMeshes[i][0] = new GUI.Rectangle();
                                scoreMeshes[i][0].cornerRadius = 20;
                                scoreMeshes[i][0].height = "100px";
                                scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                                scoreMeshes[i][0].width = "650px";
                                scoreMeshes[i][0].color = "Orange";
                                scoreMeshes[i][0].thickness = 4;
                                scoreMeshes[i][0].background = "white";
                                rect1.addControl(scoreMeshes[i][0]);
                                scoreMeshes[i][1] = new GUI.TextBlock();
                                scoreMeshes[i][1].width = "180px";
                                scoreMeshes[i][1].height = "90px";
                                scoreMeshes[i][1].leftInPixels = 210;
                                scoreMeshes[i][1].color = "black";
                                scoreMeshes[i][1].fontSize = 50;
                                scoreMeshes[i][1].text = x;
                                scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                                scoreMeshes[i][2] = new GUI.TextBlock();
                                scoreMeshes[i][2].width = "380px";
                                scoreMeshes[i][2].height = "90px";
                                scoreMeshes[i][2].leftInPixels = -130;
                                scoreMeshes[i][2].color = "black";
                                scoreMeshes[i][2].fontSize = 38;
                                let thisWeek = data2[k];
                                while (thisWeek[x]['minutes'] / 60 >= 1) {
                                    thisWeek[x]['hours'] = thisWeek[x]['hours'] + 1;
                                    thisWeek[x]['minutes'] = thisWeek[x]['minutes'] - 60;
                                }
                                scoreMeshes[i][2].text = " درهفته " + thisWeek[x]['hours'] + " ساعت و " +
                                        thisWeek[x]['minutes'] + " دقیقه";
                                scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                                i = i + 1;
                            }
                        }
                    });
            });
        rect1.addControl(text14);
        // **** پایان نمایش هفتگی مفیدیت اعضا ****
        // **** شروع نمایش ماهانه مفیدیت اعضا ****
        let text15 = new GUI.TextBlock();
        text15.height = "50px";
        text15.width = "95px";
        text15.topInPixels = -390;
        text15.leftInPixels = 260;
        text15.color = "green";
        text15.fontSize = 42;
        text15.text = "ماهانه";
        text15
            .onPointerClickObservable
            .add(() => {
                let paramsToSend = new URLSearchParams();
                paramsToSend.append("user", cookies.userid);
                axios
                    .get(serverAdrs + `/getMofidToMonth?` + paramsToSend.toString())
                    .then(res => {
                        let data2 = res.data;
                        text15.color = "brown";
                        for (let c = 0; c < scoreMeshes.length; c++) {
                            scoreMeshes[c][0].dispose();
                            scoreMeshes[c][1].dispose();
                            scoreMeshes[c][2].dispose();
                        }
                        let perDateArray = data2[0]['date'].split("-");
                        let perDate1 = jalaali.toJalaali(
                            Number(perDateArray[0]),
                            Number(perDateArray[1]) + 1,
                            Number(perDateArray[2])
                        );
                        text9.text = perDate1.jy + "-" + perDate1.jm;
                        text10.dispose();
                        text11.dispose();
                        text12.dispose();
                        text13.dispose();
                                                text10 = new GUI.TextBlock();
                        text10.height = "60px";
                        text10.width = "20px";
                        text10.topInPixels = -370;
                        text10.leftInPixels = 110;
                        text10.color = "black";
                        text10.fontSize = 38;
                        text10.text = ">";
                        text10.onPointerClickObservable.add(()=>{
                            if (k != 0) {
                                i = 0;
                                k = k - 1;
                                let perDateArray2 = data2[k]['date'].split("-");
                                let perDate2 = jalaali.toJalaali(
                                    Number(perDateArray2[0]),
                                    Number(perDateArray2[1]) + 1,
                                    Number(perDateArray2[2])
                                );
                                text9.text = perDate2.jy + "-" + perDate2.jm;
                                for (let c = 0; c < scoreMeshes.length; c++) {
                                    scoreMeshes[c][0].dispose();
                                    scoreMeshes[c][1].dispose();
                                    scoreMeshes[c][2].dispose();
                                }
                                data2[k] = Object.fromEntries(Object.entries(data2[k]).sort((a, b) => {
                                    if ((b[1]['minutes'] || b[1]['hours']) && (a[1]['minutes'] || a[1]['hours'])) {
                                        return (
                                            (b[1]['hours'] * 60 + b[1]['minutes']) - (a[1]['hours'] * 60 + a[1]['minutes'])
                                        );
                                    } else {
                                        return (b[1] - a[1]);
                                    }
                                }));
                                for (let x in data2[k]) {
                                    if (x != "date") {
                                        scoreMeshes[i] = [];
                                        scoreMeshes[i][0] = new GUI.Rectangle();
                                        scoreMeshes[i][0].cornerRadius = 20;
                                        scoreMeshes[i][0].height = "100px";
                                        scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                                        scoreMeshes[i][0].width = "650px";
                                        scoreMeshes[i][0].color = "Orange";
                                        scoreMeshes[i][0].thickness = 4;
                                        scoreMeshes[i][0].background = "white";
                                        rect1.addControl(scoreMeshes[i][0]);
                                        scoreMeshes[i][1] = new GUI.TextBlock();
                                        scoreMeshes[i][1].width = "180px";
                                        scoreMeshes[i][1].height = "90px";
                                        scoreMeshes[i][1].leftInPixels = 210;
                                        scoreMeshes[i][1].color = "black";
                                        scoreMeshes[i][1].fontSize = 50;
                                        scoreMeshes[i][1].text = x;
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                                        scoreMeshes[i][2] = new GUI.TextBlock();
                                        scoreMeshes[i][2].width = "380px";
                                        scoreMeshes[i][2].height = "90px";
                                        scoreMeshes[i][2].leftInPixels = -130;
                                        scoreMeshes[i][2].color = "black";
                                        scoreMeshes[i][2].fontSize = 38;
                                        let thisWeek = data2[k];
                                        while (thisWeek[x]['minutes'] / 60 >= 1) {
                                            thisWeek[x]['hours'] = thisWeek[x]['hours'] + 1;
                                            thisWeek[x]['minutes'] = thisWeek[x]['minutes'] - 60;
                                        }
                                        scoreMeshes[i][2].text = " درهفته " + thisWeek[x]['hours'] + " ساعت و " +
                                                thisWeek[x]['minutes'] + " دقیقه";
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                                        i = i + 1;
                                    }
                                }
                            }
                        });
                        rect1.addControl(text10);
                        text12 = new GUI.TextBlock();
                        text12.height = "60px";
                        text12.width = "20px";
                        text12.topInPixels = -370;
                        text12.leftInPixels = -110;
                        text12.color = "black";
                        text12.fontSize = 38;
                        text12.text = "<";
                        text12.onPointerClickObservable.add(()=>{
                            if(data2[k + 1]) {
                                k = k + 1;
                                i = 0;
                                let perDateArray2 = data2[k]['date'].split("-");
                                let perDate2 = jalaali.toJalaali(
                                    Number(perDateArray2[0]),
                                    Number(perDateArray2[1]) + 1,
                                    Number(perDateArray2[2])
                                );
                                text9.text = perDate2.jy + "-" + perDate2.jm;
                                for (let c = 0; c < scoreMeshes.length; c++) {
                                    scoreMeshes[c][0].dispose();
                                    scoreMeshes[c][1].dispose();
                                    scoreMeshes[c][2].dispose();
                                }
                                data2[k] = Object.fromEntries(Object.entries(data2[k]).sort((a, b) => {
                                    if ((b[1]['minutes'] || b[1]['hours']) && (a[1]['minutes'] || a[1]['hours'])) {
                                        return (
                                            (b[1]['hours'] * 60 + b[1]['minutes']) - (a[1]['hours'] * 60 + a[1]['minutes'])
                                        );
                                    } else {
                                        return (b[1] - a[1]);
                                    }
                                }));
                                for (let x in data2[k]) {
                                    if (x != "date") {
                                        scoreMeshes[i] = [];
                                        scoreMeshes[i][0] = new GUI.Rectangle();
                                        scoreMeshes[i][0].cornerRadius = 20;
                                        scoreMeshes[i][0].height = "100px";
                                        scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                                        scoreMeshes[i][0].width = "650px";
                                        scoreMeshes[i][0].color = "Orange";
                                        scoreMeshes[i][0].thickness = 4;
                                        scoreMeshes[i][0].background = "white";
                                        rect1.addControl(scoreMeshes[i][0]);
                                        scoreMeshes[i][1] = new GUI.TextBlock();
                                        scoreMeshes[i][1].width = "180px";
                                        scoreMeshes[i][1].height = "90px";
                                        scoreMeshes[i][1].leftInPixels = 210;
                                        scoreMeshes[i][1].color = "black";
                                        scoreMeshes[i][1].fontSize = 50;
                                        scoreMeshes[i][1].text = x;
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                                        scoreMeshes[i][2] = new GUI.TextBlock();
                                        scoreMeshes[i][2].width = "380px";
                                        scoreMeshes[i][2].height = "90px";
                                        scoreMeshes[i][2].leftInPixels = -130;
                                        scoreMeshes[i][2].color = "black";
                                        scoreMeshes[i][2].fontSize = 38;
                                        let thisWeek = data2[k];
                                        while (thisWeek[x]['minutes'] / 60 >= 1) {
                                            thisWeek[x]['hours'] = thisWeek[x]['hours'] + 1;
                                            thisWeek[x]['minutes'] = thisWeek[x]['minutes'] - 60;
                                        }
                                        scoreMeshes[i][2].text = " درهفته " + thisWeek[x]['hours'] + " ساعت و " +
                                                thisWeek[x]['minutes'] + " دقیقه";
                                        scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                                        i = i + 1;
                                    }
                                }
                            }
                        });
                        rect1.addControl(text12);
                        let i = 0;
                        let k = 0;
                        data2[0] = Object.fromEntries(Object.entries(data2[0]).sort((a, b) => {
                            if (b[1]['minutes'] && a[1]['minutes']) {
                                return (
                                    (b[1]['hours'] * 60 + b[1]['minutes']) - (a[1]['hours'] * 60 + a[1]['minutes'])
                                );
                            } else {
                                return (b[1] - a[1]);
                            }
                        }));
                        for (let x in data2[0]) {
                            if (x != "date") {
                                scoreMeshes[i] = [];
                                scoreMeshes[i][0] = new GUI.Rectangle();
                                scoreMeshes[i][0].cornerRadius = 20;
                                scoreMeshes[i][0].height = "100px";
                                scoreMeshes[i][0].topInPixels = -400 + ((i + 1) * 120);
                                scoreMeshes[i][0].width = "650px";
                                scoreMeshes[i][0].color = "Orange";
                                scoreMeshes[i][0].thickness = 4;
                                scoreMeshes[i][0].background = "white";
                                rect1.addControl(scoreMeshes[i][0]);
                                scoreMeshes[i][1] = new GUI.TextBlock();
                                scoreMeshes[i][1].width = "180px";
                                scoreMeshes[i][1].height = "90px";
                                scoreMeshes[i][1].leftInPixels = 210;
                                scoreMeshes[i][1].color = "black";
                                scoreMeshes[i][1].fontSize = 50;
                                scoreMeshes[i][1].text = x;
                                scoreMeshes[i][0].addControl(scoreMeshes[i][1]);
                                scoreMeshes[i][2] = new GUI.TextBlock();
                                scoreMeshes[i][2].width = "380px";
                                scoreMeshes[i][2].height = "90px";
                                scoreMeshes[i][2].leftInPixels = -130;
                                scoreMeshes[i][2].color = "black";
                                scoreMeshes[i][2].fontSize = 38;
                                let thisWeek = data2[0];
                                while (thisWeek[x]['minutes'] / 60 >= 1) {
                                    thisWeek[x]['hours'] = thisWeek[x]['hours'] + 1;
                                    thisWeek[x]['minutes'] = thisWeek[x]['minutes'] - 60;
                                }
                                scoreMeshes[i][2].text = " درماه " + thisWeek[x]['hours'] + " ساعت و " +
                                        thisWeek[x]['minutes'] + " دقیقه";
                                scoreMeshes[i][0].addControl(scoreMeshes[i][2]);
                                i = i + 1;
                            }
                        }
                    });
            });
        rect1.addControl(text15);
        return ([scoreMeshes, text15, text14, text13, text12, text11, text10, text9]);
        // **** پایان نمایش ماهانه مفیدیت اعضا ****
    }


    showHistory = (scene, controlRects, serverAdrs, x, dailyMeshes, cookies) => {
        let paramsToSend3 = new URLSearchParams();
        paramsToSend3.append("user", x);
        paramsToSend3.append("userr", cookies.userid);
        axios
        .get(serverAdrs + `/getMofidJobsName?` + paramsToSend3.toString())
        .then(res => {
            controlRects[0].topInPixels = 1000;
            controlRects[1].topInPixels = 1000;
            const advancedTexture = GUI
                .AdvancedDynamicTexture
                .CreateFullscreenUI("myUI", scene);
            let rect1 = new GUI.Rectangle();
            rect1.cornerRadius = 20;
            rect1.height = "659px";
            rect1.width = "360px";
            rect1.color = "Orange";
            rect1.thickness = 4;
            rect1.background = "white";
            rect1.isPointerBlocker = true;
            advancedTexture.addControl(rect1);
            let image = new GUI.Image("image1", "./close.png");
            image.width = "50px";
            image.height = "50px";
            image.topInPixels = -300;
            image.leftInPixels = 150
            image
                .onPointerClickObservable
                .add(() => {
                    advancedTexture.dispose();
                    controlRects[0].topInPixels = 245;
                    controlRects[1].topInPixels = -360;
                });
            rect1.addControl(image);
            let data = res.data;
            let daily = data.daily;
            let toDay = new Date();
            let i = 0;
            dailyMeshes[0] = new GUI.TextBlock();
            dailyMeshes[0].text = "تاریخچه ساعتی";
            dailyMeshes[0].color = "#fc670a";
            dailyMeshes[0].topInPixels = -300;
            dailyMeshes[0].fontSize = 24;
            dailyMeshes[0].width = "150px";
            dailyMeshes[0].height = "100px";
            rect1.addControl(dailyMeshes[0]);
            dailyMeshes[1] = new GUI.TextBlock();
            let perDate = jalaali.toJalaali(
                toDay.getFullYear(),
                (toDay.getMonth() + 1),
                toDay.getDate()
            );
            dailyMeshes[1].text = perDate.jy + "/" + perDate.jm + "/" + perDate.jd;
            dailyMeshes[1].color = "black";
            dailyMeshes[1].topInPixels = -265;
            dailyMeshes[1].fontSize = 19;
            dailyMeshes[1].width = "150px";
            dailyMeshes[1].height = "50px";
            rect1.addControl(dailyMeshes[1]);
            // **** شروع ایجاد کلید رفتن به روز بعد ****
            dailyMeshes[2] = new GUI.TextBlock();
            dailyMeshes[2].text = ">";
            dailyMeshes[2].color = "#244575";
            dailyMeshes[2].topInPixels = -265;
            dailyMeshes[2].leftInPixels = 60;
            dailyMeshes[2].fontSize = 28;
            dailyMeshes[2].width = "20px";
            dailyMeshes[2].height = "100px";
            dailyMeshes[2]
                .onPointerClickObservable
                .add(() => {
                    toDay.setDate(toDay.getDate() + 1);
                    let perDate = jalaali.toJalaali(
                        toDay.getFullYear(),
                        (toDay.getMonth() + 1),
                        toDay.getDate()
                    );
                    dailyMeshes[1].text = perDate.jy + "/" + perDate.jm + "/" + perDate.jd;
                    for (i = 0; i < daily.length; i++) {
                        if (daily[i][0].date == String(toDay.getFullYear()) + "-" + String(
                            toDay.getMonth()
                        ) + "-" + String(toDay.getDate())) {
                            break;
                        }
                    }
                    dailyMeshes[3].dispose();
                    if (i != daily.length) {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "360px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        dailyMeshes[3].barColor = "black";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].heightInPixels = daily[i].length * 90;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        for (let j = 0; j < daily[i].length; j++) {
                            let rect3 = new GUI.Rectangle();
                            rect3.cornerRadius = 15;
                            rect3.height = "90px";
                            rect3.color = "Orange";
                            rect3.thickness = 4;
                            rect3.topInPixels = ((-1 * ((daily[i].length * 90) / 2)) + j * 90) + 45;
                            rect3.background = "white";
                            dailyMeshes[4].addControl(rect3);
                            let text2 = new GUI.TextBlock();
                            text2.text = "از";
                            text2.color = "black";
                            text2.fontSize = 19;
                            text2.topInPixels = -20;
                            text2.leftInPixels = 120;
                            text2.width = "30px";
                            text2.height = "40px";
                            rect3.addControl(text2);
                            let text3 = new GUI.TextBlock();
                            text3.text = daily[i][j].startHour + " : " + daily[i][j].startMinute;
                            text3.color = "#fc670a";
                            text3.topInPixels = -20;
                            text3.fontSize = 19;
                            text3.leftInPixels = 80;
                            text3.width = "60px";
                            text3.height = "40px";
                            rect3.addControl(text3);
                            let text6 = new GUI.TextBlock();
                            text6.text = "تا";
                            text6.color = "black";
                            text6.fontSize = 19;
                            text6.topInPixels = -20;
                            text6.leftInPixels = 40;
                            text6.width = "50px";
                            text6.height = "40px";
                            rect3.addControl(text6);
                            let endHour = daily[i][j].hourDuration + daily[i][j].startHour
                            let endMinute = daily[i][j].minutesDuration + daily[i][j].startMinute
                            while (endMinute / 60 >= 1) {
                                endHour = endHour + 1;
                                endMinute = endMinute - 60;
                            }
                            let text7 = new GUI.TextBlock();
                            text7.text = Math.floor(endHour) + " : " + Math.floor(endMinute);
                            text7.color = "#fc670a";
                            text7.fontSize = 19;
                            text7.topInPixels = -20;
                            text7.leftInPixels = 0;
                            text7.width = "60px";
                            text7.height = "40px";
                            rect3.addControl(text7);
                            let text14 = new GUI.TextBlock();
                            text14.text = "به مدت";
                            text14.color = "black";
                            text14.fontSize = 19;
                            text14.leftInPixels = -55;
                            text14.width = "50px";
                            text14.topInPixels = -20;
                            text14.height = "40px";
                            rect3.addControl(text14);
                            let text15 = new GUI.TextBlock();
                            text15.text = Math.floor(daily[i][j].hourDuration) + " : " + Math.floor(
                                daily[i][j].minutesDuration
                            );
                            text15.color = "#fc670a";
                            text15.fontSize = 19;
                            text15.leftInPixels = -110;
                            text15.width = "60px";
                            text15.topInPixels = -20;
                            text15.height = "40px";
                            rect3.addControl(text15);
                            let text11 = new GUI.TextBlock();
                            text11.text = "مشغول انجام کار";
                            text11.color = "black";
                            text11.fontSize = 19;
                            text11.topInPixels = 18;
                            text11.leftInPixels = 95;
                            text11.width = "120px";
                            text11.height = "40px";
                            rect3.addControl(text11);
                            let text12 = new GUI.TextBlock();
                            text12.text = daily[i][j].task;
                            text12.color = "#fc670a";
                            text12.fontSize = 19;
                            text12.topInPixels = 18;
                            text12.leftInPixels = -40;
                            text12.width = "150px";
                            text12.height = "40px";
                            rect3.addControl(text12);
                            let text13 = new GUI.TextBlock();
                            text13.text = "بودی";
                            text13.color = "black";
                            text13.fontSize = 19;
                            text13.topInPixels = 18;
                            text13.leftInPixels = -135;
                            text13.width = "105px";
                            text13.height = "40px";
                            rect3.addControl(text13);
                        }
                    } else {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "390px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].adaptHeightToChildren = true;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        let rect3 = new GUI.Rectangle();
                        rect3.cornerRadius = 20;
                        rect3.height = "90px";
                        rect3.color = "Orange";
                        rect3.thickness = 4;
                        rect3.topInPixels = 0;
                        rect3.background = "white";
                        dailyMeshes[4].addControl(rect3);
                        let text2 = new GUI.TextBlock();
                        text2.text = "امروز هیچکار نکردی";
                        text2.color = "black";
                        text2.fontSize = 19;
                        text2.height = "40px";
                        rect3.addControl(text2);
                    }

                });
            rect1.addControl(dailyMeshes[2]);
            // **** پایان ایجاد کلید رفتن به روز بعد **** **** شروع ایجاد کلید رفتن به ماه
            // بعد ****
            dailyMeshes[5] = new GUI.TextBlock();
            dailyMeshes[5].text = ">";
            dailyMeshes[5].color = "#244575";
            dailyMeshes[5].topInPixels = -265;
            dailyMeshes[5].leftInPixels = 80;
            dailyMeshes[5].fontSize = 28;
            dailyMeshes[5].width = "20px";
            dailyMeshes[5].height = "100px";
            dailyMeshes[5]
                .onPointerClickObservable
                .add(() => {
                    toDay.setMonth(toDay.getMonth() + 1);
                    let perDate = jalaali.toJalaali(
                        toDay.getFullYear(),
                        (toDay.getMonth() + 1),
                        toDay.getDate()
                    );
                    dailyMeshes[1].text = perDate.jy + "/" + perDate.jm + "/" + perDate.jd;
                    for (i = 0; i < daily.length; i++) {
                        if (daily[i][0].date == String(toDay.getFullYear()) + "-" + String(
                            toDay.getMonth()
                        ) + "-" + String(toDay.getDate())) {
                            break;
                        }
                    }
                    dailyMeshes[3].dispose();
                    if (i != daily.length) {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "360px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        dailyMeshes[3].barColor = "black";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].heightInPixels = daily[i].length * 90;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        for (let j = 0; j < daily[i].length; j++) {
                            let rect3 = new GUI.Rectangle();
                            rect3.cornerRadius = 15;
                            rect3.height = "90px";
                            rect3.color = "Orange";
                            rect3.thickness = 4;
                            rect3.topInPixels = ((-1 * ((daily[i].length * 90) / 2)) + j * 90) + 45;
                            rect3.background = "white";
                            dailyMeshes[4].addControl(rect3);
                            let text2 = new GUI.TextBlock();
                            text2.text = "از";
                            text2.color = "black";
                            text2.fontSize = 19;
                            text2.topInPixels = -20;
                            text2.leftInPixels = 120;
                            text2.width = "30px";
                            text2.height = "40px";
                            rect3.addControl(text2);
                            let text3 = new GUI.TextBlock();
                            text3.text = daily[i][j].startHour + " : " + daily[i][j].startMinute;
                            text3.color = "#fc670a";
                            text3.topInPixels = -20;
                            text3.fontSize = 19;
                            text3.leftInPixels = 80;
                            text3.width = "60px";
                            text3.height = "40px";
                            rect3.addControl(text3);
                            let text6 = new GUI.TextBlock();
                            text6.text = "تا";
                            text6.color = "black";
                            text6.fontSize = 19;
                            text6.topInPixels = -20;
                            text6.leftInPixels = 40;
                            text6.width = "50px";
                            text6.height = "40px";
                            rect3.addControl(text6);
                            let endHour = daily[i][j].hourDuration + daily[i][j].startHour
                            let endMinute = daily[i][j].minutesDuration + daily[i][j].startMinute
                            while (endMinute / 60 >= 1) {
                                endHour = endHour + 1;
                                endMinute = endMinute - 60;
                            }
                            let text7 = new GUI.TextBlock();
                            text7.text = Math.floor(endHour) + " : " + Math.floor(endMinute);
                            text7.color = "#fc670a";
                            text7.fontSize = 19;
                            text7.topInPixels = -20;
                            text7.leftInPixels = 0;
                            text7.width = "60px";
                            text7.height = "40px";
                            rect3.addControl(text7);
                            let text14 = new GUI.TextBlock();
                            text14.text = "به مدت";
                            text14.color = "black";
                            text14.fontSize = 19;
                            text14.leftInPixels = -55;
                            text14.width = "50px";
                            text14.topInPixels = -20;
                            text14.height = "40px";
                            rect3.addControl(text14);
                            let text15 = new GUI.TextBlock();
                            text15.text = Math.floor(daily[i][j].hourDuration) + " : " + Math.floor(
                                daily[i][j].minutesDuration
                            );
                            text15.color = "#fc670a";
                            text15.fontSize = 19;
                            text15.leftInPixels = -110;
                            text15.width = "60px";
                            text15.topInPixels = -20;
                            text15.height = "40px";
                            rect3.addControl(text15);
                            let text11 = new GUI.TextBlock();
                            text11.text = "مشغول انجام کار";
                            text11.color = "black";
                            text11.fontSize = 19;
                            text11.topInPixels = 18;
                            text11.leftInPixels = 95;
                            text11.width = "120px";
                            text11.height = "40px";
                            rect3.addControl(text11);
                            let text12 = new GUI.TextBlock();
                            text12.text = daily[i][j].task;
                            text12.color = "#fc670a";
                            text12.fontSize = 19;
                            text12.topInPixels = 18;
                            text12.leftInPixels = -40;
                            text12.width = "150px";
                            text12.height = "40px";
                            rect3.addControl(text12);
                            let text13 = new GUI.TextBlock();
                            text13.text = "بودی";
                            text13.color = "black";
                            text13.fontSize = 19;
                            text13.topInPixels = 18;
                            text13.leftInPixels = -135;
                            text13.width = "105px";
                            text13.height = "40px";
                            rect3.addControl(text13);
                        }
                    } else {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "390px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].adaptHeightToChildren = true;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        let rect3 = new GUI.Rectangle();
                        rect3.cornerRadius = 20;
                        rect3.height = "90px";
                        rect3.color = "Orange";
                        rect3.thickness = 4;
                        rect3.topInPixels = 0;
                        rect3.background = "white";
                        dailyMeshes[4].addControl(rect3);
                        let text2 = new GUI.TextBlock();
                        text2.text = "امروز هیچکار نکردی";
                        text2.color = "black";
                        text2.fontSize = 19;
                        text2.height = "40px";
                        rect3.addControl(text2);
                    }

                });
            rect1.addControl(dailyMeshes[5]);
            // **** پایان ایجاد کلید رفتن به ماه بعد **** **** شروع ایجاد کلید رفتن به روز
            // قبل ****
            dailyMeshes[6] = new GUI.TextBlock();
            dailyMeshes[6].text = "<";
            dailyMeshes[6].color = "#244575";
            dailyMeshes[6].topInPixels = -265;
            dailyMeshes[6].leftInPixels = -60;
            dailyMeshes[6].fontSize = 28;
            dailyMeshes[6].width = "20px";
            dailyMeshes[6].height = "100px";
            dailyMeshes[6]
                .onPointerClickObservable
                .add(() => {
                    toDay.setDate(toDay.getDate() - 1);
                    let perDate = jalaali.toJalaali(
                        toDay.getFullYear(),
                        (toDay.getMonth() + 1),
                        toDay.getDate()
                    );
                    dailyMeshes[1].text = perDate.jy + "/" + perDate.jm + "/" + perDate.jd;
                    for (i = 0; i < daily.length; i++) {
                        if (daily[i][0].date == String(toDay.getFullYear()) + "-" + String(
                            toDay.getMonth()
                        ) + "-" + String(toDay.getDate())) {
                            break;
                        }
                    }
                    dailyMeshes[3].dispose();
                    if (i != daily.length) {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "360px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        dailyMeshes[3].barColor = "black";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].heightInPixels = daily[i].length * 90;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        for (let j = 0; j < daily[i].length; j++) {
                            let rect3 = new GUI.Rectangle();
                            rect3.cornerRadius = 15;
                            rect3.height = "90px";
                            rect3.color = "Orange";
                            rect3.thickness = 4;
                            rect3.topInPixels = ((-1 * ((daily[i].length * 90) / 2)) + j * 90) + 45;
                            rect3.background = "white";
                            dailyMeshes[4].addControl(rect3);
                            let text2 = new GUI.TextBlock();
                            text2.text = "از";
                            text2.color = "black";
                            text2.fontSize = 19;
                            text2.topInPixels = -20;
                            text2.leftInPixels = 120;
                            text2.width = "30px";
                            text2.height = "40px";
                            rect3.addControl(text2);
                            let text3 = new GUI.TextBlock();
                            text3.text = daily[i][j].startHour + " : " + daily[i][j].startMinute;
                            text3.color = "#fc670a";
                            text3.topInPixels = -20;
                            text3.fontSize = 19;
                            text3.leftInPixels = 80;
                            text3.width = "60px";
                            text3.height = "40px";
                            rect3.addControl(text3);
                            let text6 = new GUI.TextBlock();
                            text6.text = "تا";
                            text6.color = "black";
                            text6.fontSize = 19;
                            text6.topInPixels = -20;
                            text6.leftInPixels = 40;
                            text6.width = "50px";
                            text6.height = "40px";
                            rect3.addControl(text6);
                            let endHour = daily[i][j].hourDuration + daily[i][j].startHour
                            let endMinute = daily[i][j].minutesDuration + daily[i][j].startMinute
                            while (endMinute / 60 >= 1) {
                                endHour = endHour + 1;
                                endMinute = endMinute - 60;
                            }
                            let text7 = new GUI.TextBlock();
                            text7.text = Math.floor(endHour) + " : " + Math.floor(endMinute);
                            text7.color = "#fc670a";
                            text7.fontSize = 19;
                            text7.topInPixels = -20;
                            text7.leftInPixels = 0;
                            text7.width = "60px";
                            text7.height = "40px";
                            rect3.addControl(text7);
                            let text14 = new GUI.TextBlock();
                            text14.text = "به مدت";
                            text14.color = "black";
                            text14.fontSize = 19;
                            text14.leftInPixels = -55;
                            text14.width = "50px";
                            text14.topInPixels = -20;
                            text14.height = "40px";
                            rect3.addControl(text14);
                            let text15 = new GUI.TextBlock();
                            text15.text = Math.floor(daily[i][j].hourDuration) + " : " + Math.floor(
                                daily[i][j].minutesDuration
                            );
                            text15.color = "#fc670a";
                            text15.fontSize = 19;
                            text15.leftInPixels = -110;
                            text15.width = "60px";
                            text15.topInPixels = -20;
                            text15.height = "40px";
                            rect3.addControl(text15);
                            let text11 = new GUI.TextBlock();
                            text11.text = "مشغول انجام کار";
                            text11.color = "black";
                            text11.fontSize = 19;
                            text11.topInPixels = 18;
                            text11.leftInPixels = 95;
                            text11.width = "120px";
                            text11.height = "40px";
                            rect3.addControl(text11);
                            let text12 = new GUI.TextBlock();
                            text12.text = daily[i][j].task;
                            text12.color = "#fc670a";
                            text12.fontSize = 19;
                            text12.topInPixels = 18;
                            text12.leftInPixels = -40;
                            text12.width = "150px";
                            text12.height = "40px";
                            rect3.addControl(text12);
                            let text13 = new GUI.TextBlock();
                            text13.text = "بودی";
                            text13.color = "black";
                            text13.fontSize = 19;
                            text13.topInPixels = 18;
                            text13.leftInPixels = -135;
                            text13.width = "105px";
                            text13.height = "40px";
                            rect3.addControl(text13);
                        }
                    } else {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "390px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].adaptHeightToChildren = true;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        let rect3 = new GUI.Rectangle();
                        rect3.cornerRadius = 20;
                        rect3.height = "90px";
                        rect3.color = "Orange";
                        rect3.thickness = 4;
                        rect3.topInPixels = 0;
                        rect3.background = "white";
                        dailyMeshes[4].addControl(rect3);
                        let text2 = new GUI.TextBlock();
                        text2.text = "امروز هیچکار نکردی";
                        text2.color = "black";
                        text2.fontSize = 19;
                        text2.height = "40px";
                        rect3.addControl(text2);
                    }
                });
            rect1.addControl(dailyMeshes[6]);
            // **** پایان ایجاد کلید رفتن به روز قبل **** **** شروع ایجاد کلید رفتن به ماه
            // قبل ****
            dailyMeshes[7] = new GUI.TextBlock();
            dailyMeshes[7].text = "<";
            dailyMeshes[7].color = "#244575";
            dailyMeshes[7].topInPixels = -265;
            dailyMeshes[7].leftInPixels = -80;
            dailyMeshes[7].fontSize = 28;
            dailyMeshes[7].width = "20px";
            dailyMeshes[7].height = "100px";
            dailyMeshes[7]
                .onPointerClickObservable
                .add(() => {
                    toDay.setMonth(toDay.getMonth() - 1);
                    let perDate = jalaali.toJalaali(
                        toDay.getFullYear(),
                        (toDay.getMonth() + 1),
                        toDay.getDate()
                    );
                    dailyMeshes[1].text = perDate.jy + "/" + perDate.jm + "/" + perDate.jd;
                    for (i = 0; i < daily.length; i++) {
                        if (daily[i][0].date == String(toDay.getFullYear()) + "-" + String(
                            toDay.getMonth()
                        ) + "-" + String(toDay.getDate())) {
                            break;
                        }
                    }
                    dailyMeshes[3].dispose();
                    if (i != daily.length) {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "360px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        dailyMeshes[3].barColor = "black";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].heightInPixels = daily[i].length * 90;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        for (let j = 0; j < daily[i].length; j++) {
                            let rect3 = new GUI.Rectangle();
                            rect3.cornerRadius = 15;
                            rect3.height = "90px";
                            rect3.color = "Orange";
                            rect3.thickness = 4;
                            rect3.topInPixels = ((-1 * ((daily[i].length * 90) / 2)) + j * 90) + 45;
                            rect3.background = "white";
                            dailyMeshes[4].addControl(rect3);
                            let text2 = new GUI.TextBlock();
                            text2.text = "از";
                            text2.color = "black";
                            text2.fontSize = 19;
                            text2.topInPixels = -20;
                            text2.leftInPixels = 120;
                            text2.width = "30px";
                            text2.height = "40px";
                            rect3.addControl(text2);
                            let text3 = new GUI.TextBlock();
                            text3.text = daily[i][j].startHour + " : " + daily[i][j].startMinute;
                            text3.color = "#fc670a";
                            text3.topInPixels = -20;
                            text3.fontSize = 19;
                            text3.leftInPixels = 80;
                            text3.width = "60px";
                            text3.height = "40px";
                            rect3.addControl(text3);
                            let text6 = new GUI.TextBlock();
                            text6.text = "تا";
                            text6.color = "black";
                            text6.fontSize = 19;
                            text6.topInPixels = -20;
                            text6.leftInPixels = 40;
                            text6.width = "50px";
                            text6.height = "40px";
                            rect3.addControl(text6);
                            let endHour = daily[i][j].hourDuration + daily[i][j].startHour
                            let endMinute = daily[i][j].minutesDuration + daily[i][j].startMinute
                            while (endMinute / 60 >= 1) {
                                endHour = endHour + 1;
                                endMinute = endMinute - 60;
                            }
                            let text7 = new GUI.TextBlock();
                            text7.text = Math.floor(endHour) + " : " + Math.floor(endMinute);
                            text7.color = "#fc670a";
                            text7.fontSize = 19;
                            text7.topInPixels = -20;
                            text7.leftInPixels = 0;
                            text7.width = "60px";
                            text7.height = "40px";
                            rect3.addControl(text7);
                            let text14 = new GUI.TextBlock();
                            text14.text = "به مدت";
                            text14.color = "black";
                            text14.fontSize = 19;
                            text14.leftInPixels = -55;
                            text14.width = "50px";
                            text14.topInPixels = -20;
                            text14.height = "40px";
                            rect3.addControl(text14);
                            let text15 = new GUI.TextBlock();
                            text15.text = Math.floor(daily[i][j].hourDuration) + " : " + Math.floor(
                                daily[i][j].minutesDuration
                            );
                            text15.color = "#fc670a";
                            text15.fontSize = 19;
                            text15.leftInPixels = -110;
                            text15.width = "60px";
                            text15.topInPixels = -20;
                            text15.height = "40px";
                            rect3.addControl(text15);
                            let text11 = new GUI.TextBlock();
                            text11.text = "مشغول انجام کار";
                            text11.color = "black";
                            text11.fontSize = 19;
                            text11.topInPixels = 18;
                            text11.leftInPixels = 95;
                            text11.width = "120px";
                            text11.height = "40px";
                            rect3.addControl(text11);
                            let text12 = new GUI.TextBlock();
                            text12.text = daily[i][j].task;
                            text12.color = "#fc670a";
                            text12.fontSize = 19;
                            text12.topInPixels = 18;
                            text12.leftInPixels = -40;
                            text12.width = "150px";
                            text12.height = "40px";
                            rect3.addControl(text12);
                            let text13 = new GUI.TextBlock();
                            text13.text = "بودی";
                            text13.color = "black";
                            text13.fontSize = 19;
                            text13.topInPixels = 18;
                            text13.leftInPixels = -135;
                            text13.width = "105px";
                            text13.height = "40px";
                            rect3.addControl(text13);
                        }
                    } else {
                        dailyMeshes[3] = new GUI.ScrollViewer();
                        dailyMeshes[3].width = "390px";
                        dailyMeshes[3].height = "550px";
                        dailyMeshes[3].topInPixels = 25;
                        dailyMeshes[3].background = "orange";
                        rect1.addControl(dailyMeshes[3]);
                        dailyMeshes[4] = new GUI.Rectangle();
                        dailyMeshes[4].adaptHeightToChildren = true;
                        dailyMeshes[4].thickness = 10;
                        dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                        dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                        dailyMeshes[4].color = "Orange";
                        dailyMeshes[4].background = "Orange";
                        dailyMeshes[3].addControl(dailyMeshes[4]);
                        let rect3 = new GUI.Rectangle();
                        rect3.cornerRadius = 20;
                        rect3.height = "90px";
                        rect3.color = "Orange";
                        rect3.thickness = 4;
                        rect3.topInPixels = 0;
                        rect3.background = "white";
                        dailyMeshes[4].addControl(rect3);
                        let text2 = new GUI.TextBlock();
                        text2.text = "امروز هیچکار نکردی";
                        text2.color = "black";
                        text2.fontSize = 19;
                        text2.height = "40px";
                        rect3.addControl(text2);
                    }
                });
            rect1.addControl(dailyMeshes[7]);
            // **** پایان ایجاد کلید رفتن به ماه قبل ****
            dailyMeshes[3] = new GUI.ScrollViewer();
            dailyMeshes[3].width = "390px";
            dailyMeshes[3].height = "550px";
            dailyMeshes[3].topInPixels = 25;
            dailyMeshes[3].background = "orange";
            rect1.addControl(dailyMeshes[3]);
            dailyMeshes[4] = new GUI.Rectangle();
            dailyMeshes[4].heightInPixels = daily[i].length * 90;
            dailyMeshes[4].thickness = 10;
            dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
            dailyMeshes[4].color = "Orange";
            dailyMeshes[4].background = "Orange";
            dailyMeshes[3].addControl(dailyMeshes[4]);
            for (i = 0; i < daily.length; i++) {
                if (daily[i][0].date == String(toDay.getFullYear()) + "-" + String(
                    toDay.getMonth()
                ) + "-" + String(toDay.getDate())) {
                    break;
                }
            }
            if (i != daily.length) {
                dailyMeshes[3] = new GUI.ScrollViewer();
                dailyMeshes[3].width = "360px";
                dailyMeshes[3].height = "550px";
                dailyMeshes[3].topInPixels = 25;
                dailyMeshes[3].background = "orange";
                dailyMeshes[3].barColor = "black";
                rect1.addControl(dailyMeshes[3]);
                dailyMeshes[4] = new GUI.Rectangle();
                dailyMeshes[4].heightInPixels = daily[i].length * 90;
                dailyMeshes[4].thickness = 10;
                dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                dailyMeshes[4].color = "Orange";
                dailyMeshes[4].background = "Orange";
                dailyMeshes[3].addControl(dailyMeshes[4]);
                for (let j = 0; j < daily[i].length; j++) {
                    let rect3 = new GUI.Rectangle();
                    rect3.cornerRadius = 15;
                    rect3.height = "90px";
                    rect3.color = "Orange";
                    rect3.thickness = 4;
                    rect3.topInPixels = ((-1 * ((daily[i].length * 90) / 2)) + j * 90) + 45;
                    rect3.background = "white";
                    dailyMeshes[4].addControl(rect3);
                    let text2 = new GUI.TextBlock();
                    text2.text = "از";
                    text2.color = "black";
                    text2.fontSize = 19;
                    text2.topInPixels = -20;
                    text2.leftInPixels = 120;
                    text2.width = "30px";
                    text2.height = "40px";
                    rect3.addControl(text2);
                    let text3 = new GUI.TextBlock();
                    text3.text = daily[i][j].startHour + " : " + daily[i][j].startMinute;
                    text3.color = "#fc670a";
                    text3.topInPixels = -20;
                    text3.fontSize = 19;
                    text3.leftInPixels = 80;
                    text3.width = "60px";
                    text3.height = "40px";
                    rect3.addControl(text3);
                    let text6 = new GUI.TextBlock();
                    text6.text = "تا";
                    text6.color = "black";
                    text6.fontSize = 19;
                    text6.topInPixels = -20;
                    text6.leftInPixels = 40;
                    text6.width = "50px";
                    text6.height = "40px";
                    rect3.addControl(text6);
                    let endHour = daily[i][j].hourDuration + daily[i][j].startHour
                    let endMinute = daily[i][j].minutesDuration + daily[i][j].startMinute
                    while (endMinute / 60 >= 1) {
                        endHour = endHour + 1;
                        endMinute = endMinute - 60;
                    }
                    let text7 = new GUI.TextBlock();
                    text7.text = Math.floor(endHour) + " : " + Math.floor(endMinute);
                    text7.color = "#fc670a";
                    text7.fontSize = 19;
                    text7.topInPixels = -20;
                    text7.leftInPixels = 0;
                    text7.width = "60px";
                    text7.height = "40px";
                    rect3.addControl(text7);
                    let text14 = new GUI.TextBlock();
                    text14.text = "به مدت";
                    text14.color = "black";
                    text14.fontSize = 19;
                    text14.leftInPixels = -55;
                    text14.width = "50px";
                    text14.topInPixels = -20;
                    text14.height = "40px";
                    rect3.addControl(text14);
                    let text15 = new GUI.TextBlock();
                    text15.text = Math.floor(daily[i][j].hourDuration) + " : " + Math.floor(
                        daily[i][j].minutesDuration
                    );
                    text15.color = "#fc670a";
                    text15.fontSize = 19;
                    text15.leftInPixels = -110;
                    text15.width = "60px";
                    text15.topInPixels = -20;
                    text15.height = "40px";
                    rect3.addControl(text15);
                    let text11 = new GUI.TextBlock();
                    text11.text = "مشغول انجام کار";
                    text11.color = "black";
                    text11.fontSize = 19;
                    text11.topInPixels = 18;
                    text11.leftInPixels = 95;
                    text11.width = "120px";
                    text11.height = "40px";
                    rect3.addControl(text11);
                    let text12 = new GUI.TextBlock();
                    text12.text = daily[i][j].task;
                    text12.color = "#fc670a";
                    text12.fontSize = 19;
                    text12.topInPixels = 18;
                    text12.leftInPixels = -40;
                    text12.width = "150px";
                    text12.height = "40px";
                    rect3.addControl(text12);
                    let text13 = new GUI.TextBlock();
                    text13.text = "بودی";
                    text13.color = "black";
                    text13.fontSize = 19;
                    text13.topInPixels = 18;
                    text13.leftInPixels = -135;
                    text13.width = "105px";
                    text13.height = "40px";
                    rect3.addControl(text13);
                }
            } else {
                dailyMeshes[3] = new GUI.ScrollViewer();
                dailyMeshes[3].width = "390px";
                dailyMeshes[3].height = "550px";
                dailyMeshes[3].topInPixels = 25;
                dailyMeshes[3].background = "orange";
                rect1.addControl(dailyMeshes[3]);
                dailyMeshes[4] = new GUI.Rectangle();
                dailyMeshes[4].adaptHeightToChildren = true;
                dailyMeshes[4].thickness = 10;
                dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                dailyMeshes[4].color = "Orange";
                dailyMeshes[4].background = "Orange";
                dailyMeshes[3].addControl(dailyMeshes[4]);
                let rect3 = new GUI.Rectangle();
                rect3.cornerRadius = 20;
                rect3.height = "90px";
                rect3.color = "Orange";
                rect3.thickness = 4;
                rect3.topInPixels = 0;
                rect3.background = "white";
                dailyMeshes[4].addControl(rect3);
                let text2 = new GUI.TextBlock();
                text2.text = "امروز هیچکار نکردی";
                text2.color = "black";
                text2.fontSize = 19;
                text2.height = "40px";
                rect3.addControl(text2);
            }
        });
    }
}

export default score_board;