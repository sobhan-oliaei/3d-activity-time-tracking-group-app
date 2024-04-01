import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';
import axios from 'axios';
import tablet from './tablet';

/**
* A class containing the function of creating and displaying the user's touch keys
*/

class touch_control {
    /**
    * A function of creating and displaying the user's touch keys
    */
    create = (scene, inputMap, controlRects, walkingAnim, standingAnim, serverAdrs, cookies) => {
        const advancedTexture6 = GUI
        .AdvancedDynamicTexture
        .CreateFullscreenUI("myUI", scene);
    controlRects[0] = new GUI.Image("image2", "./up-arrow.png");
    controlRects[0].height = "80px";
    controlRects[0].width = "80px";
    controlRects[0].topInPixels = 245;
    controlRects[0].leftInPixels = 70;
    controlRects[0]
        .onPointerDownObservable
        .add(() => {
            inputMap['w'] = true;
        });
    controlRects[0]
        .onPointerUpObservable
        .add(() => {
            inputMap['w'] = false;
            walkingAnim.stop();
            standingAnim.start(true, 1, standingAnim.from, standingAnim.to, false);
        });
    advancedTexture6.addControl(controlRects[0]);
    controlRects[1] = new GUI.Image("image5", "./shortcut.png");
    controlRects[1].height = "80px";
    controlRects[1].width = "80px";
    controlRects[1].topInPixels = -360;
    controlRects[1].leftInPixels = -170;
    // Defining how to display the tablet with shortcut
    controlRects[1]
        .onPointerDownObservable
        .add(() => {
            const tabletObj = new tablet();
            tabletObj.tablet(scene,controlRects,serverAdrs,cookies);
        });
    advancedTexture6.addControl(controlRects[1]);
    }

}

export default touch_control;