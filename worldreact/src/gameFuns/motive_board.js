import '@babylonjs/loaders';
import * as GUI from 'babylonjs-gui';

/**
* A class to display a motivational picture on the wall of the room
*/
class motive_board {
    /**
    * A function to display a motivational picture on the wall of the room
    */
    create = (scene) => {
        let advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(scene.getMeshByName("motiveboard"));
        let imageNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        let image = new GUI.Image("but", "motiveboard/" + String(imageNumber) + ".png");
        image.widthInPixels = 1000;
        image.heightInPixels = 1000;
        advancedTexture.addControl(image);
    }
}
export default motive_board;