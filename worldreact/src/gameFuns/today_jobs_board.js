import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';

/**
* A class containing the function of displaying today's user's work on the wall of the room
*/

class today_jobs_board {
    /**
    * A function of displaying today's user's work on the wall of the room
    */
    create = (scene, serverAdrs, cookies) => {
        let advancedTexture4 = GUI
        .AdvancedDynamicTexture
        .CreateForMesh(scene.getMeshByName('jobsboard'));
    let rect2 = new GUI.Rectangle();
    rect2.cornerRadius = 20;
    rect2.height = "950px";
    rect2.width = "1100px";
    rect2.color = "Orange";
    rect2.thickness = 4;
    rect2.background = "white";
    advancedTexture4.addControl(rect2);
    let text2 = new GUI.TextBlock();
    text2.height = "100px";
    text2.topInPixels = -400
    text2.color = "black";
    text2.fontSize = 60;
    text2.text = " : کار های امروز"
    rect2.addControl(text2);
    let scoreMeshes2 = [];
    let paramsToSend3 = new URLSearchParams();
    paramsToSend3.append("user", cookies.userid);
    axios
        .get(serverAdrs + `/getJobsToDay?` + paramsToSend3.toString())
        .then(res => {
            let data = res.data;
            let i = 0;
            data.forEach((value) => {
                scoreMeshes2[i] = new GUI.TextBlock();
                scoreMeshes2[i].height = "100px";
                scoreMeshes2[i].topInPixels = -285 + (i * 100);
                scoreMeshes2[i].color = "black";
                scoreMeshes2[i].fontSize = 60;
                scoreMeshes2[i].text = value.name;
                rect2.addControl(scoreMeshes2[i]);
                i = i + 1;
            })
        });
    }
}

export default today_jobs_board;