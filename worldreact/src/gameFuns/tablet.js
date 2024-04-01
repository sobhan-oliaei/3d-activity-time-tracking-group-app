import {
    ActionManager,
    ExecuteCodeAction
} from "@babylonjs/core";
import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';

/**
* A class with functions needed to work with the game's virtual tablet screen
* by clicking the user on tablet
*/
class tablet {
    /**
    * A function to create a virtual game tablet on the screen
    * by clicking the user on tablet
    */
    create = (scene,controlRects ,serverAdrs, cookies) => {
        const tablet = scene.getMeshByName('tablet');
        tablet.actionManager = new ActionManager(scene);
        tablet
            .actionManager
            .registerAction(new ExecuteCodeAction({
                trigger: ActionManager.OnPickDownTrigger
            }, () => {
                this.tablet(scene,controlRects ,serverAdrs, cookies);
            },),);
    }
    /**
    * A function to display a virtual game tablet on the screen
    * by clicking the user on tablet
    */
    tablet = (scene,controlRects ,serverAdrs, cookies) => {
        controlRects[0].topInPixels = 1000;
        controlRects[1].topInPixels = 1000;
        const advancedTexture2 = GUI
            .AdvancedDynamicTexture
            .CreateFullscreenUI("myUI", scene);
        let rect4 = new GUI.Rectangle();
        rect4.cornerRadius = 20;
        rect4.height = "659px";
        rect4.width = "360px";
        rect4.color = "Orange";
        rect4.thickness = 4;
        rect4.background = "white";
        rect4.isPointerBlocker = true;
        advancedTexture2.addControl(rect4);
        let image = new GUI.Image("image1", "./close.png");
        image.width = "50px";
        image.height = "50px";
        image.topInPixels = -300;
        image.leftInPixels = 150
        let rect2Obs = image
            .onPointerClickObservable
            .add(() => {
                advancedTexture2.dispose();
                controlRects[0].topInPixels = 245;
                controlRects[1].topInPixels = -360;
            });
        rect4.addControl(image);
        let text1 = new GUI.TextBlock();
        text1.text = "اسم کاری که میخوای بهش مشغول شی رو انتخاب کن\nو شروع کن";
        text1.color = "black";
        text1.topInPixels = -70;
        text1.fontSize = 18;
        text1.height = "180px"
        rect4.addControl(text1);
        let input = new GUI.InputText();
        input.maxWidth = "340px";
        input.height = "40px";
        input.color = "black";
        input.background = "orange";
        input.placeholderText = "اسم کارتو اینجا بنویس";
        input.placeholderColor = "black";
        input.focusedBackground = "orange";
        input.autoStretchWidth = true;
        rect4.addControl(input);
        let rect9 = new GUI.Rectangle();
        rect9.cornerRadius = 5;
        rect9.height = "40px";
        rect9.width = "250px";
        rect9.topInPixels = 70;
        rect9.color = "Orange";
        rect9.thickness = 4;
        rect9.background = "orange";
        rect9.onPointerClickObservable.add(()=>{
            let paramsToSend = new URLSearchParams();
            paramsToSend.append("user", cookies.userid);
            axios
                .get(serverAdrs + `/getJobs?` + paramsToSend.toString())
                .then(res => {
                    let tasks = res.data;
                    let i = 0;
                    let rect10 = new GUI.ScrollViewer();
                    rect10.width = "280px";
                    if (Object.keys(tasks).length < 6) {
                        rect10.heightInPixels =Object.keys(tasks).length * 52
                    }
                    else {
                        rect10.heightInPixels = 254;
                    }
                    rect10.topInPixels = 25;
                    rect10.isPointerBlocker = true;
                    rect10.background = "orange";
                    rect4.addControl(rect10);
                    let rect11 = new GUI.Rectangle();
                    rect11.heightInPixels = Object.keys(tasks).length * 50;
                    rect11.thickness = 10;
                    rect11.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    rect11.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                    rect11.color = "Orange";
                    rect11.background = "Orange";
                    rect10.addControl(rect11);
                    for (let x in tasks) {
                        let rect12 = new GUI.Rectangle();
                        rect12.cornerRadius = 20;
                        rect12.height = "50px";
                        rect12.color = "Orange";
                        rect12.thickness = 4;
                        rect12.topInPixels = ((-1 * ((Object.keys(tasks).length * 50) / 2)) + i * 50) + 25;
                        rect12.background = "white";
                        rect12.onPointerClickObservable.add(()=>{
                            input.text = tasks[x].name;
                            rect10.dispose();
                        });
                        rect11.addControl(rect12);
                        let text8 = new GUI.TextBlock();
                        text8.text = tasks[x].name;
                        text8.color = "black";
                        text8.fontSize = 18;
                        rect12.addControl(text8);
                        i = i + 1;
                    }
                });
        });
        rect4.addControl(rect9);
        let text3 = new GUI.TextBlock();
        text3.text = "انتخاب از لیست کار ها";
        text3.color = "black";
        text3.fontSize = 18;
        rect9.addControl(text3);
        let rect8 = new GUI.Rectangle();
        rect8.cornerRadius = 20;
        rect8.height = "50px";
        rect8.width = "150px";
        rect8.topInPixels = 160;
        rect8.color = "Orange";
        rect8.thickness = 4;
        rect8.background = "orange";
        rect8
            .onPointerClickObservable
            .add(() => {
                let paramsToSend3 = new URLSearchParams();
                paramsToSend3.append("user", cookies.userid);
                paramsToSend3.append("task", input.text);
                axios
                    .get(serverAdrs + `/addNewSession?` + paramsToSend3.toString())
                    .then(res => {
                        if (res.data == "session added") {
                            text1.dispose();
                            input.dispose();
                            rect8.dispose();
                            rect9.dispose();
                            image.leftInPixels = 80;
                            image.topInPixels = -295;
                            image
                                .onPointerClickObservable
                                .remove(rect2Obs);
                            image
                                .onPointerClickObservable
                                .add(() => {
                                    let paramsToSend = new URLSearchParams();
                                    paramsToSend.append("user", cookies.userid);
                                    axios
                                        .get(serverAdrs + `/deleteOldSession?` + paramsToSend.toString())
                                        .then(res => {
                                            if (res.data == "session deleted and saved") {
                                                advancedTexture2.dispose();
                                                controlRects[0].topInPixels = 245;
                                                controlRects[1].topInPixels = -360;
                                            }
                                        });
                                })
                                let image2 = new GUI.Image("image2", "./tick.png");
                                image2.width = "60px";
                                image2.height = "60px";
                                image2.topInPixels = -295;
                                image2.leftInPixels = 145
                                image2
                                    .onPointerClickObservable
                                    .add(() => {
                                        let paramsToSend = new URLSearchParams();
                                        paramsToSend.append("user", cookies.userid);
                                        axios
                                            .get(serverAdrs + `/saveOldSession?` + paramsToSend.toString())
                                            .then(res => {
                                                if (res.data == "session deleted and saved") {
                                                    advancedTexture2.dispose();
                                                    controlRects[0].topInPixels = 245;
                                                    controlRects[1].topInPixels = -360;
                                                }
                                            });
                                    });
                                rect4.addControl(image2);
                            let text5 = new GUI.TextBlock();
                            text5.text = "تو الان مفیدی پس مفید باش\nو گوشی دستت نگیر";
                            text5.color = "#fc670a";
                            text5.fontSize = 24;
                            text5.height = "200px"
                            rect4.addControl(text5);
                            let newDate1 = new Date();
                            let text6 = new GUI.TextBlock();
                            text6.text = "0:0";
                            text6.topInPixels = 80;
                            text6.color = "#fc670a";
                            text6.fontSize = 18;
                            text6.height = "200px"
                            rect4.addControl(text6);
                            const timerInterval = setInterval(() => {
                                let newDate2 = new Date();
                                let diff = newDate2.getTime() - newDate1.getTime();
                                let minute = 60 * 1000;
                                let hour = minute * 60;
                                let diffHour = Math.floor(diff / hour);
                                let diffMinute = Math.floor((diff % hour) / minute);
                                text6.text = diffHour + " : " + diffMinute;
                            }, 61000);
                            let text7 = new GUI.TextBlock();
                            text7.text = " : زمان سنج مفیدیت";
                            text7.topInPixels = 55;
                            text7.color = "#fc670a";
                            text7.fontSize = 18;
                            text7.height = "200px"
                            rect4.addControl(text7);
                        }
                    });
            });
        rect4.addControl(rect8);
        let text2 = new GUI.TextBlock();
        text2.text = "شروع";
        text2.color = "black";
        text2.fontSize = 24;
        rect8.addControl(text2);
    }
}

export default tablet;