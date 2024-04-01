import React from "react";
import {
    Vector3,
    HemisphericLight,
    SceneLoader,
    ArcRotateCamera,
    ActionManager,
    ExecuteCodeAction,
    PointLight,
    Color3
} from "@babylonjs/core";
import '@babylonjs/loaders';
import SceneComponent from "./SceneComponent";
import "./GamePage.css";
import { useCookies } from 'react-cookie';
import touch_control from "./gameFuns/touch_control";
import new_work from "./gameFuns/new_work";
import tablet from "./gameFuns/tablet";
import active_tablet from "./gameFuns/active_tablet";
import works_list from "./gameFuns/works_list";
import works_history from "./gameFuns/works_history";
import score_board from "./gameFuns/score_board";
import today_jobs_board from "./gameFuns/today_jobs_board";
import add_job from "./gameFuns/add_job";
import motive_board from "./gameFuns/motive_board";


/**
* A component to display the game screen
*/
export default () => {
    let inputMap = {};
    let controlRects = [];
    let cameraAlpha = Math.PI / 2 - 0.5934119449999999;
    let camera;
    // change your server address here too
    let serverAdrs = `http://localhost`;
    const [cookies, setCookie] = useCookies();
    /**
    * A function that is executed when the game scene is ready
    */
    const onSceneReady = (scene, engine) => {
        camera = new ArcRotateCamera("camera1", 0, 0, 0, new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl();
        camera.angularSensibilityX = 550;
        scene.clearColor = new Color3(0, 0, 0);
        const light = new PointLight("pointLight", new Vector3(3.8, 1.5, -3.8), scene);
        light.range = 100;
        light.intensity = 2;
        const light2 = new PointLight("pointLight", new Vector3(-3.8, 1.5, 3.8), scene);
        light2.range = 100;
        light2.intensity = 2;
        const light3 = new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);
        light3.intensity = 0.5;
        const canvas = scene
            .getEngine()
            .getRenderingCanvas();
        SceneLoader
            .ImportMeshAsync("", "/", "character.glb", scene)
            .then((result2) => {
                const character = result2.meshes[0];
                scene
                    .getMeshByName("charcol")
                    .isVisible = false;
                SceneLoader
                    .ImportMeshAsync("", "/", "vworld-mofid-inside-room.glb", scene)
                    .then((result3) => {
                        let cameraTargetPosition = Vector3.Lerp(
                            Vector3.Zero(),
                            new Vector3(character.position.x, character.position.y + 5, character.position.z),
                            0.4
                        );
                        camera.setTarget(cameraTargetPosition);
                        const standingAnim = scene.getAnimationGroupByName("standing");
                        const walkingAnim = scene.getAnimationGroupByName("walking");
                        character.rotate(new Vector3(0, 1, 0), Math.PI + 0.5934119449999999)
                        camera.alpha = Math.PI / 2 - 0.5934119449999999;
                        camera.radius = 2;
                        camera.setTarget(cameraTargetPosition);
                        camera.beta = Math.PI / 2.5;

                        const touch_controlObj = new touch_control();
                        touch_controlObj.create(scene, inputMap, controlRects, walkingAnim, standingAnim, serverAdrs, cookies);

                        const active_tabletObj = new active_tablet();
                        active_tabletObj.create(scene, controlRects, serverAdrs, cookies);

                        const new_workObj = new new_work();
                        new_workObj.create(scene, controlRects, serverAdrs, cookies);

                        const tabletObj = new tablet();
                        tabletObj.create(scene, controlRects, serverAdrs, cookies);

                        const works_listObj = new works_list();
                        works_listObj.create(scene, controlRects, serverAdrs, cookies);

                        const works_historyObj = new works_history();
                        works_historyObj.create(scene, controlRects, serverAdrs, cookies);

                        const score_boardObj = new score_board();
                        score_boardObj.create(scene, controlRects, serverAdrs, cookies);


                        const today_jobs_boardObj = new today_jobs_board();
                        today_jobs_boardObj.create(scene, serverAdrs, cookies);


                        const add_jobObj = new add_job();
                        add_jobObj.create(scene, serverAdrs, cookies);


                        const motive_boardObj = new motive_board();
                        motive_boardObj.create(scene);

                        scene.actionManager = new ActionManager(scene);
                        scene
                            .actionManager
                            .registerAction(new ExecuteCodeAction({
                                trigger: ActionManager.OnKeyDownTrigger,
                                parameter: function (actionEvent) {
                                    if (actionEvent.sourceEvent.key === 'w') {
                                        inputMap['w'] = true;
                                    }
                                    if (actionEvent.sourceEvent.key === 'a') {
                                        inputMap['a'] = true;
                                    }
                                    if (actionEvent.sourceEvent.key === 'd') {
                                        inputMap['d'] = true;
                                    }
                                    if (actionEvent.sourceEvent.key === 's') {
                                        inputMap['s'] = true;
                                    }
                                }
                            }));
                        scene
                            .actionManager
                            .registerAction(new ExecuteCodeAction({
                                trigger: ActionManager.OnKeyUpTrigger,
                                parameter: function (actionEvent) {
                                    if (actionEvent.sourceEvent.key === 'w') {
                                        inputMap['w'] = false;
                                        walkingAnim.stop();
                                        standingAnim.start(true, 0.1, walkingAnim.from, walkingAnim.to, false);
                                    }
                                    if (actionEvent.sourceEvent.key === 'a') {
                                        inputMap['a'] = false;
                                    }
                                    if (actionEvent.sourceEvent.key === 'd') {
                                        inputMap['d'] = false;
                                    }
                                    if (actionEvent.sourceEvent.key === 's') {
                                        inputMap['s'] = false;
                                        walkingAnim.stop();
                                        standingAnim.start(true, 0.1, walkingAnim.from, walkingAnim.to, false);
                                    }
                                }
                            }));
                        let collisionCheckArray = [
                            scene.getMeshByName("charcol"),
                            scene.getMeshByName("wall1"),
                            scene.getMeshByName("wall2"),
                            scene.getMeshByName("wall3"),
                            scene.getMeshByName("wall4"),
                            scene.getMeshByName("ontable")
                        ];
                        let wOrS = '';
                        let cameraAlphaSaver = camera.alpha;
                        let cameraBetaSaver = camera.beta;
                        /**
                        * A function that is executed before the game scene renders
                        */
                        scene
                            .onBeforeRenderObservable
                            .add(() => {
                                if (inputMap['w']) {
                                    character.movePOV(0, 0, 0.035);
                                    wOrS = 'w';
                                    camera.setTarget(
                                        new Vector3(character.position.x, character.position.y + 2, character.position.z)
                                    );
                                    camera.beta = cameraBetaSaver;
                                    standingAnim.stop();
                                    walkingAnim.start(true, 1.0, walkingAnim.from, walkingAnim.to, false);

                                }
                                if (inputMap['a']) {
                                    cameraAlpha = cameraAlpha + (Math.PI / 100);
                                    camera.alpha = cameraAlpha;
                                }
                                if (inputMap['d']) {
                                    cameraAlpha = cameraAlpha + ((Math.PI / 100) * -1);
                                    camera.alpha = cameraAlpha;
                                }
                                if (inputMap['s']) {
                                    character.movePOV(0, 0, -0.035);
                                    wOrS = 's';
                                    camera.setTarget(
                                        new Vector3(character.position.x, character.position.y + 2, character.position.z)
                                    );
                                    camera.beta = cameraBetaSaver;
                                    standingAnim.stop();
                                    walkingAnim.start(true, 1.0, walkingAnim.to, walkingAnim.from, false);
                                }
                                if (camera.beta > Math.PI / 2) {
                                    camera.beta = Math.PI / 2;
                                }
                                if (!(camera.radius == 2)) {
                                    camera.radius = 2;
                                }
                                if (camera.alpha != cameraAlphaSaver) {
                                    character.rotate(new Vector3(0, 1, 0), (cameraAlphaSaver - camera.alpha));
                                    cameraAlphaSaver = camera.alpha;
                                    cameraAlpha = camera.alpha;
                                }
                                if (camera.beta != cameraBetaSaver) {
                                    cameraBetaSaver = camera.beta;
                                }
                                if (wOrS == 'w') {
                                    for (let im = 1; im < 6; im++) {
                                        if (collisionCheckArray[0].intersectsMesh(collisionCheckArray[im])) {
                                            character.movePOV(0, 0, -0.07);
                                        }
                                    }
                                } else if (wOrS == "s") {
                                    for (let im = 1; im < 6; im++) {
                                        if (collisionCheckArray[0].intersectsMesh(collisionCheckArray[im])) {
                                            character.movePOV(0, 0, 0.07);
                                        }
                                    }
                                }
                            });
                        engine.hideLoadingUI();
                    })
            })
    }

    /**
    * A function that is executed when the game scene renders
    */
    const onRender = (scene) => { };
    return (
        <div>
            <SceneComponent
                style={{
                    width: "100%",
                    height: "100vh"
                }}
                antialias="antialias"
                onSceneReady={onSceneReady}
                onRender={onRender}
                id="my-canvas" />
        </div>
    );
}