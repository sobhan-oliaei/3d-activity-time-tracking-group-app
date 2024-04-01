import {
    ActionManager,
    ExecuteCodeAction
} from "@babylonjs/core";
import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';
let jalaali = require('jalaali-js');

/**
* A class containing the function of displaying user history
*/

class works_history {
    /**
    * A function of displaying user history
    */
    create = (scene, controlRects, serverAdrs, cookies) => {
        const paper3 = scene.getMeshByName('paper1.002');
        paper3.actionManager = new ActionManager(scene);
        paper3
            .actionManager
            .registerAction(new ExecuteCodeAction({
                trigger: ActionManager.OnPickDownTrigger
            }, () => {
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
                let dailyMeshes = [];
                let paramsToSend = new URLSearchParams();
                paramsToSend.append("user", cookies.userid);
                axios
                    .get(serverAdrs + `/getMofidHistory?` + paramsToSend.toString())
                    .then(res => {
                        let data = res.data;
                        let daily = data.daily;
                        let weekly = data.weekly;
                        let toDay = new Date();
                        let i = 0;
                        dailyMeshes[0] = new GUI.TextBlock();
                        dailyMeshes[0].text = "تاریخچه ساعتی";
                        dailyMeshes[0].color = "#fc670a";
                        dailyMeshes[0].topInPixels = -300;
                        dailyMeshes[0].fontSize = 24;
                        dailyMeshes[0].width = "150px";
                        dailyMeshes[0].height = "100px";
                        dailyMeshes[0]
                            .onPointerClickObservable
                            .add(() => {
                                if (dailyMeshes[0].text == "تاریخچه ساعتی") {
                                    // Define how to display the daily history
                                    dailyMeshes[0].text = "تاریخچه روزانه";
                                    let toDay = new Date();
                                    for (let l = 1; l < dailyMeshes.length; l++) {
                                        dailyMeshes[l].dispose();
                                    }
                                    dailyMeshes[1] = new GUI.TextBlock();
                                    let perDate = jalaali.toJalaali(toDay.getFullYear(), (toDay.getMonth() + 1), 1);
                                    dailyMeshes[1].text = perDate.jy;
                                    dailyMeshes[1].color = "black";
                                    dailyMeshes[1].topInPixels = -265;
                                    dailyMeshes[1].fontSize = 19;
                                    dailyMeshes[1].width = "120px";
                                    dailyMeshes[1].height = "50px";
                                    rect1.addControl(dailyMeshes[1]);
                                    dailyMeshes[3] = new GUI.ScrollViewer();
                                    dailyMeshes[3].width = "370px";
                                    dailyMeshes[3].height = "550px";
                                    dailyMeshes[3].topInPixels = 25;
                                    dailyMeshes[3].background = "orange";
                                    rect1.addControl(dailyMeshes[3]);
                                    dailyMeshes[4] = new GUI.Rectangle();
                                    dailyMeshes[4].thickness = 10;
                                    dailyMeshes[4].heightInPixels = 45 * weekly.length;
                                    dailyMeshes[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                                    dailyMeshes[4].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                                    dailyMeshes[4].color = "Orange";
                                    dailyMeshes[4].background = "Orange";
                                    dailyMeshes[3].addControl(dailyMeshes[4]);
                                    let f = 0;
                                    for (let k = 0; k < weekly.length; k++) {
                                        if (weekly[k]['minutesDuration'] || weekly[k]['hourDuration']) {
                                            let rect3 = new GUI.Rectangle();
                                            rect3.cornerRadius = 20;
                                            rect3.height = "45px";
                                            rect3.color = "Orange";
                                            rect3.thickness = 4;
                                            rect3.topInPixels = -(weekly.length * 22.5) + f * 45 + 45;
                                            f = f + 1;
                                            rect3.background = "white";
                                            dailyMeshes[4].addControl(rect3);
                                            let text2 = new GUI.TextBlock();
                                            text2.text = "روز";
                                            text2.color = "black";
                                            text2.fontSize = 19;
                                            text2.leftInPixels = 140;
                                            text2.width = "30px";
                                            text2.height = "40px";
                                            rect3.addControl(text2);
                                            let text3 = new GUI.TextBlock();
                                            let datearray = weekly[k]['date'].split("-");
                                            let perDate = jalaali.toJalaali(
                                                Number(datearray[0]),
                                                Number(datearray[1]) + 1,
                                                Number(datearray[2])
                                            );
                                            text3.text = perDate.jy + "-" + perDate.jm + "-" + perDate.jd;
                                            text3.color = "#fc670a";
                                            text3.fontSize = 19;
                                            text3.leftInPixels = 77;
                                            text3.width = "110px";
                                            text3.height = "40px";
                                            rect3.addControl(text3);
                                            let text4 = new GUI.TextBlock();
                                            text4.text = "به مدت";
                                            text4.color = "black";
                                            text4.fontSize = 19;
                                            text4.leftInPixels = 5;
                                            text4.width = "80px";
                                            text4.height = "40px";
                                            rect3.addControl(text4);
                                            while (weekly[k]['minutesDuration'] / 60 >= 1) {
                                                weekly[k]['hourDuration'] = Math.floor(weekly[k]['hourDuration']) + 1;
                                                weekly[k]['minutesDuration'] = weekly[k]['minutesDuration'] - 60;
                                            }
                                            let text5 = new GUI.TextBlock();
                                            text5.text = Math.floor(weekly[k]['hourDuration']) + " : " + Math.floor(
                                                weekly[k]['minutesDuration']
                                            );
                                            text5.color = "#fc670a";
                                            text5.fontSize = 19;
                                            text5.leftInPixels = -50;
                                            text5.width = "80px";
                                            text5.height = "40px";
                                            rect3.addControl(text5);
                                            let text6 = new GUI.TextBlock();
                                            text6.text = "مفید بودی";
                                            text6.color = "black";
                                            text6.fontSize = 19;
                                            text6.leftInPixels = -115;
                                            text6.width = "80px";
                                            text6.height = "40px";
                                            rect3.addControl(text6);
                                        }
                                    }
                                } else {
                                    // Define how to display hourly history by key
                                    for (let l = 1; l < dailyMeshes.length; l++) {
                                        dailyMeshes[l].dispose();
                                    }
                                    dailyMeshes[0].text = "تاریخچه ساعتی";
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
                                    // Define the key to go to the next day in hourly history
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
                                    // Define the key to go to the next month in hourly history
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
                                    // Define the key to go to the previous day in hourly history
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
                                    // Define the key to go to the previous month in hourly history
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
                                    // Define today in hourly history
                                    dailyMeshes[3] = new GUI.ScrollViewer();
                                    dailyMeshes[3].width = "390px";
                                    dailyMeshes[3].height = "550px";
                                    dailyMeshes[3].topInPixels = 25;
                                    dailyMeshes[3].background = "orange";
                                    rect1.addControl(dailyMeshes[3]);
                                    dailyMeshes[4] = new GUI.Rectangle();
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
                                }
                            });
                        // **** شروع نمایش تاریخچه روزانه به صورت دیفالت ****
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
                        // **** پایان نمایش تاریخچه روزانه به صورت دیفالت ****
                    });
            },),);
    }
}

export default works_history;