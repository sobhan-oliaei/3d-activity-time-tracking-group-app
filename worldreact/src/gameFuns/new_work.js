import {
    ActionManager,
    ExecuteCodeAction
} from "@babylonjs/core";
import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';

/**
* A class containing the function of adding the title of a work to the user's task list
*/
class new_work {
    /**
    * A function to add a work title to the user's task list
    */
    create = (scene, controlRects, serverAdrs, cookies) => {
        const paper = scene.getMeshByName('paper1');
        paper.actionManager = new ActionManager(scene);
        paper
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
                let text1 = new GUI.TextBlock();
                text1.text = "کار جدیدتو اضافه کن";
                text1.color = "orange";
                text1.width = "270px";
                text1.height = "80px";
                text1.topInPixels = -300;
                text1.fontSize = 24;
                rect1.addControl(text1);
                let text2 = new GUI.TextBlock();
                text2.text = "کار جدیدی که میخوای شروع کنی\n : را بنویس";
                text2.color = "black";
                text2.topInPixels = -240;
                text2.width = "300px";
                text2.height = "80px";
                text2.fontSize = 20;
                rect1.addControl(text2);
                let input = new GUI.InputText();
                input.maxWidth = "340px";
                input.height = "40px";
                input.color = "black";
                input.topInPixels = -185;
                input.background = "orange";
                input.placeholderText = "اسم کارتو اینجا بنویس";
                input.placeholderColor = "black";
                input.focusedBackground = "orange";
                input.autoStretchWidth = true;
                rect1.addControl(input);
                let text3 = new GUI.TextBlock();
                text3.width = "340px";
                text3.height = "70px";
                text3.topInPixels = -120;
                text3.color = "black";
                text3.fontSize = 20;
                text3.text = "روزایی تو هفته که میخوای\nانجامش بدی رو هم انتخاب کن";
                rect1.addControl(text3);
                let rectArray1 = [];
                let textArray1 = [];
                let isPicked = [];
                for (let i = 0; i < 7; i++) {
                    rectArray1[i] = new GUI.Rectangle();
                    rectArray1[i].cornerRadius = 20;
                    rectArray1[i].height = "40px";
                    rectArray1[i].topInPixels = 0;
                    rectArray1[i].leftInPixels = 0;
                    rectArray1[i].width = "70px";
                    rectArray1[i].color = "Orange";
                    rectArray1[i].thickness = 4;
                    rectArray1[i].background = "white";
                    textArray1[i] = new GUI.TextBlock();
                    textArray1[i].color = "black";
                    textArray1[i].fontSize = 20;
                    switch (i) {
                        case 6:
                            textArray1[i].text = "شنبه";
                            rectArray1[i].topInPixels = -55;
                            rectArray1[i].leftInPixels = 115;
                            break;
                        case 0:
                            textArray1[i].text = "یک شنبه";
                            rectArray1[i].topInPixels = -55;
                            rectArray1[i].leftInPixels = 42;
                            break;
                        case 1:
                            textArray1[i].text = "دوشنبه";
                            rectArray1[i].topInPixels = -55;
                            rectArray1[i].leftInPixels = -31;
                            break;
                        case 2:
                            textArray1[i].text = "سه شنبه";
                            rectArray1[i].topInPixels = -55;
                            rectArray1[i].leftInPixels = -104;
                            break;
                        case 3:
                            textArray1[i].text = "چهارشنبه";
                            rectArray1[i].topInPixels = -5;
                            rectArray1[i].leftInPixels = 115;
                            break;
                        case 4:
                            textArray1[i].text = "پنجشنبه";
                            rectArray1[i].topInPixels = -5;
                            rectArray1[i].leftInPixels = 42;
                            break;
                        case 5:
                            textArray1[i].text = "جمعه";
                            rectArray1[i].topInPixels = -5;
                            rectArray1[i].leftInPixels = -31;
                            break;
                    }
                    isPicked[i] = false;
                    rectArray1[i]
                        .onPointerClickObservable
                        .add(() => {
                            if (!isPicked[i]) {
                                rectArray1[i].background = "black";
                                textArray1[i].color = "white";
                                isPicked[i] = 1;
                            } else {
                                rectArray1[i].background = "white";
                                textArray1[i].color = "black";
                                isPicked[i] = 0;
                            }
                        });
                    rect1.addControl(rectArray1[i]);
                    rectArray1[i].addControl(textArray1[i]);
                }
                let text4 = new GUI.TextBlock();
                text4.width = "340px";
                text4.height = "40px";
                text4.topInPixels = 45;
                text4.color = "black";
                text4.fontSize = 20;
                text4.text = "کارت توضیحات داره ؟ خب بنویس";
                rect1.addControl(text4);
                let inputTextArea = new GUI.InputTextArea('Example InputTextArea', "");
                inputTextArea.color = "white";
                inputTextArea.fontSize = 18;
                inputTextArea.width = "350px";
                inputTextArea.height = "200px";
                inputTextArea.topInPixels = 165;
                rect1.addControl(inputTextArea);
                let rect3 = new GUI.Rectangle();
                rect3.cornerRadius = 20;
                rect3.height = "50px";
                rect3.topInPixels = 295;
                rect3.width = "200px";
                rect3.color = "Orange";
                rect3.thickness = 4;
                rect3.background = "Orange";
                rect3
                    .onPointerClickObservable
                    .add(() => {
                        let paramsToSend = new URLSearchParams();
                        paramsToSend.append("user", cookies.userid);
                        paramsToSend.append("name", input.text);
                        paramsToSend.append("weekDays", isPicked);
                        paramsToSend.append("description", inputTextArea.text);
                        axios
                            .get(serverAdrs + `/addNewTask?` + paramsToSend.toString())
                            .then(res => {
                                if (res.data == "task added") {
                                    advancedTexture.dispose();
                                    controlRects[0].topInPixels = 245;
                                    controlRects[1].topInPixels = -360;
                                }
                            });
                    });
                rect1.addControl(rect3);
                let text5 = new GUI.TextBlock();
                text5.width = "340px";
                text5.height = "40px";
                text5.color = "black";
                text5.fontSize = 25;
                text5.text = "ذخیره";
                rect3.addControl(text5);
            },),);
    }
}

export default new_work;