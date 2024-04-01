import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';
let jalaali = require('jalaali-js');

/**
* A class containing the function of adding the title of a task to the user's task list
*/
class add_job {
    /**
    * A function to add a task title to the user's task list
    */
    create = (scene, serverAdrs, cookies) => {
        let advancedTexture5 = GUI
            .AdvancedDynamicTexture
            .CreateForMesh(scene.getMeshByName('addjobboard'));
        let rect3 = new GUI.Rectangle();
        rect3.cornerRadius = 20;
        rect3.height = "800px";
        rect3.width = "950px";
        rect3.color = "Orange";
        rect3.thickness = 4;
        rect3.background = "white";
        advancedTexture5.addControl(rect3);
        let text3 = new GUI.TextBlock();
        text3.height = "100px";
        text3.topInPixels = -330
        text3.leftInPixels = 300
        text3.color = "black";
        text3.fontSize = 60;
        text3.text = " : اسم کار";
        rect3.addControl(text3);
        let input = new GUI.InputText();
        input.maxWidth = "550px";
        input.height = "100px";
        input.color = "black";
        input.topInPixels = -330;
        input.leftInPixels = -150
        input.background = "orange";
        input.placeholderText = "اسم کارتو اینجا بنویس";
        input.focusedBackground = "orange";
        input.placeholderColor = "black";
        input.autoStretchWidth = true;
        input.fontSize = 45;
        rect3.addControl(input);
        let rect9 = new GUI.Rectangle();
        rect9.cornerRadius = 5;
        rect9.height = "80px";
        rect9.width = "400px";
        rect9.topInPixels = -220;
        rect9.leftInPixels = -150
        rect9.color = "Orange";
        rect9.thickness = 4;
        rect9.background = "orange";
        rect9.onPointerClickObservable.add(() => {
            let paramsToSend = new URLSearchParams();
            paramsToSend.append("user", cookies.userid);
            axios
                .get(serverAdrs + `/getJobs?` + paramsToSend.toString())
                .then(res => {
                    let tasks = res.data;
                    let i = 0;
                    let rect10 = new GUI.ScrollViewer();
                    rect10.width = "670px";
                    if (Object.keys(tasks).length < 5) {
                        rect10.heightInPixels = Object.keys(tasks).length * 105
                    }
                    else {
                        rect10.heightInPixels = 405;
                    }
                    rect10.isPointerBlocker = true;
                    rect10.background = "orange";
                    rect3.addControl(rect10);
                    let rect11 = new GUI.Rectangle();
                    rect11.heightInPixels = Object.keys(tasks).length * 100;
                    rect11.thickness = 10;
                    rect11.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    rect11.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                    rect11.color = "Orange";
                    rect11.background = "Orange";
                    rect10.addControl(rect11);
                    for (let x in tasks) {
                        let rect12 = new GUI.Rectangle();
                        rect12.cornerRadius = 20;
                        rect12.height = "100px";
                        rect12.color = "Orange";
                        rect12.thickness = 4;
                        rect12.topInPixels = ((-1 * ((Object.keys(tasks).length * 100) / 2)) + i * 100) + 50;
                        rect12.background = "white";
                        rect12.onPointerClickObservable.add(() => {
                            input.text = tasks[x].name;
                            rect10.dispose();
                        });
                        rect11.addControl(rect12);
                        let text8 = new GUI.TextBlock();
                        text8.text = tasks[x].name;
                        text8.color = "black";
                        text8.fontSize = 52;
                        rect12.addControl(text8);
                        i = i + 1;
                    }
                });
        });
        rect3.addControl(rect9);
        let text9 = new GUI.TextBlock();
        text9.text = "انتخاب از لیست کار ها";
        text9.color = "black";
        text9.fontSize = 48;
        rect9.addControl(text9);
        let text5 = new GUI.TextBlock();
        text5.height = "100px";
        text5.topInPixels = -110;
        text5.leftInPixels = 300;
        text5.color = "black";
        text5.fontSize = 60;
        text5.text = " : زمان";
        rect3.addControl(text5);
        let input3 = new GUI.InputText();
        input3.maxWidth = "550px";
        input3.height = "100px";
        input3.color = "black";
        input3.topInPixels = -110;
        input3.leftInPixels = -150
        input3.background = "orange";
        input3.placeholderText = "format : 03:07 or 3:7";
        input3.focusedBackground = "orange";
        input3.placeholderColor = "black";
        input3.autoStretchWidth = true;
        input3.isReadOnly = true;
        input3.fontSize = 45;
        rect3.addControl(input3);
        let input4;
        let rect4 = new GUI.Rectangle();
        rect4.cornerRadius = 20;
        rect4.height = "100px";
        rect4.topInPixels = 150;
        rect4.width = "350px";
        rect4.color = "Orange";
        rect4.thickness = 4;
        rect4.background = "orange";
        rect4
            .onPointerClickObservable
            .add(() => {
                let paramsToSend4 = new URLSearchParams();
                paramsToSend4.append("user", cookies.userid);
                paramsToSend4.append("name", input.text);
                if (input4) {
                    let perDateArray = input4
                        .text
                        .split("-");
                    let perDate = jalaali.toGregorian(
                        Number(perDateArray[0]),
                        Number(perDateArray[1]),
                        Number(perDateArray[2])
                    );
                    paramsToSend4.append(
                        "date",
                        String(perDate.gy) + "-" + String(perDate.gm) + "-" + String(perDate.gd)
                    );
                    input4.text = "";
                }
                input.text = "";
                axios
                    .get(serverAdrs + `/addNewTaskWithDate?` + paramsToSend4.toString())
                    .then(res => {
                        let data = res.data;
                    });
            });
        rect3.addControl(rect4);
        let text8 = new GUI.TextBlock();
        text8.height = "100px";
        text8.color = "black";
        text8.fontSize = 50;
        text8.text = "ذخیره برای فردا";
        rect4.addControl(text8);
        let checkbox = new GUI.Checkbox();
        checkbox.width = "50px";
        checkbox.height = "50px";
        checkbox.topInPixels = 20;
        checkbox.leftInPixels = 270;
        checkbox.isChecked = false;
        checkbox.color = "orange";
        let text7;
        checkbox
            .onIsCheckedChangedObservable
            .add(function (value) {
                if (value == true) {
                    text7 = new GUI.TextBlock();
                    text7.height = "100px";
                    text7.topInPixels = 150;
                    text7.leftInPixels = 300;
                    text7.color = "black";
                    text7.fontSize = 60;
                    text7.text = " : تاریخ";
                    rect3.addControl(text7);
                    input4 = new GUI.InputText();
                    input4.maxWidth = "550px";
                    input4.height = "100px";
                    input4.color = "black";
                    input4.topInPixels = 150;
                    input4.leftInPixels = -150
                    input4.background = "orange";
                    input4.placeholderText = "format : 1402-4-15";
                    input4.focusedBackground = "orange";
                    input4.placeholderColor = "black";
                    input4.autoStretchWidth = true;
                    input4.fontSize = 45;
                    rect3.addControl(input4);
                    rect4.topInPixels = 280;
                    text8.text = "ذخیره";
                } else {
                    text7.dispose();
                    input4.dispose();
                    input4 = undefined;
                    rect4.topInPixels = 150;
                    text8.text = "ذخیره برای فردا";
                }
            });
        rect3.addControl(checkbox);
        let text6 = new GUI.TextBlock();
        text6.height = "100px";
        text6.width = "370px"
        text6.topInPixels = 20;
        text6.leftInPixels = -50;
        text6.color = "black";
        text6.fontSize = 50;
        text6.text = "انتخاب روز مشخص";
        rect3.addControl(text6);
    }
}

export default add_job;