import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';
/**
* A class with functions needed to work with the game's virtual tablet screen
* if the user is active
*/
class active_tablet {
    /**
    * A function to create a virtual game tablet on the screen
    * if the user is active
    */
    create = (scene, controlRects, serverAdrs, cookies) => {
        let paramsToSend2 = new URLSearchParams();
        paramsToSend2.append("user", cookies.userid);
        axios
            .get(serverAdrs + `/getIsMofid?` + paramsToSend2.toString())
            .then(res => {
                let data = res.data;
                if (data.message == "mofid") {
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
                    let text5 = new GUI.TextBlock();
                    text5.text = "تو الان مفیدی پس مفید باش\nو گوشی دستت نگیر";
                    text5.color = "#fc670a";
                    text5.height = "200px";
                    text5.fontSize = 24;
                    rect4.addControl(text5);
                    let newDate1 = new Date(data.time);
                    let text6 = new GUI.TextBlock();
                    let newDate2 = new Date(data.newTime);
                    let diff = newDate2.getTime() - newDate1.getTime();
                    let minute = 60 * 1000;
                    let hour = minute * 60;
                    let diffHour = Math.floor(diff / hour);
                    let diffMinute = Math.floor((diff % hour) / minute);
                    text6.text = diffHour + " : " + diffMinute;
                    text6.topInPixels = 80;
                    text6.color = "#fc670a";
                    text6.fontSize = 18;
                    text6.height = "200px"
                    rect4.addControl(text6);
                    const timeInterval = setInterval(() => {
                        newDate2.setMinutes(newDate2.getMinutes() + 1);
                    }, 60000);
                    const timerInterval = setInterval(() => {
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
                    let image = new GUI.Image("image1", "./close.png");
                    image.width = "50px";
                    image.height = "50px";
                    image.topInPixels = -295;
                    image.leftInPixels = 80
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
                        });
                    rect4.addControl(image);
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
                }
            });
    }
}

export default active_tablet;