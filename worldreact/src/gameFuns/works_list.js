import {
    ActionManager,
    ExecuteCodeAction
} from "@babylonjs/core";
import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';

/**
* A class containing the function of displaying user works
*/

class works_list {
    /**
    * A function of displaying user works
    */
    create = (scene, controlRects, serverAdrs, cookies) => {
        const paper2 = scene.getMeshByName('paper1.001');
        paper2.actionManager = new ActionManager(scene);
        paper2
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
                text1.text = " : لیست کار ها";
                text1.color = "red";
                text1.topInPixels = -300;
                text1.fontSize = 24;
                text1.width = "150px";
                text1.height = "100px";
                rect1.addControl(text1);
                let paramsToSend = new URLSearchParams();
                paramsToSend.append("user", cookies.userid);
                axios
                    .get(serverAdrs + `/getJobs?` + paramsToSend.toString())
                    .then(res => {
                        let tasks = res.data;
                        let i = 0;
                        for (let x in tasks) {
                            let rect3 = new GUI.Rectangle();
                            rect3.cornerRadius = 20;
                            rect3.height = "45px";
                            rect3.color = "Orange";
                            rect3.thickness = 4;
                            rect3.background = "white";
                            rect3.topInPixels = -250 + (i * 47);
                            rect1.addControl(rect3);
                            let text2 = new GUI.TextBlock();
                            text2.text = tasks[x].name;
                            text2.color = "black";
                            text2.fontSize = 19;
                            text2.leftInPixels = 75;
                            text2.width = "220px";
                            text2.height = "40px";
                            rect3.addControl(text2);
                            let rect4 = new GUI.Rectangle();
                            rect4.cornerRadius = 20;
                            rect4.height = "45px";
                            rect4.width = "70px";
                            rect4.color = "Orange";
                            rect4.thickness = 4;
                            rect4.background = "orange";
                            rect4.leftInPixels = -120;
                            rect4
                                .onPointerClickObservable
                                .add(() => {
                                    let paramsToSend = new URLSearchParams();
                                    paramsToSend.append("user", cookies.userid);
                                    paramsToSend.append("task", x);
                                    axios
                                        .get(serverAdrs + `/deleteOldTask?` + paramsToSend.toString())
                                        .then(res => {
                                            if (res.data == "task deleted") {
                                                rect3.dispose();
                                            }
                                        });
                                });
                            rect3.addControl(rect4);
                            let text3 = new GUI.TextBlock();
                            text3.text = "حذف";
                            text3.color = "black";
                            text3.fontSize = 19;
                            rect4.addControl(text3);
                            i = i + 1;
                        }
                    });
            },),);
    }
}

export default works_list;