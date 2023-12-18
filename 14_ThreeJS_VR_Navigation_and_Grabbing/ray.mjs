import * as THREE from '../99_Lib/three.module.min.js';
import { keyboard } from './keyboard.mjs';
import { createVRcontrollers } from './vr.mjs';

export function createLine(scene) {
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, 1, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    const position = line.geometry.attributes.position.array;

    return (idx, pos) => {
        idx *= 3;
        position[idx++] = pos.x;
        position[idx++] = pos.y;
        position[idx++] = pos.z;
        line.geometry.attributes.position.needsUpdate = true;
    }
}

export function Ray(renderer, scene, world, cursor, objects) {

    let position = new THREE.Vector3();
    let rotation = new THREE.Quaternion();
    let scale = new THREE.Vector3();
    let endRay = new THREE.Vector3();
    let direction = new THREE.Vector3();

    const raycaster = new THREE.Raycaster();

    let grabbed = false, squeezed = false;
    keyboard(" ", (state) => {
        console.log("grabbed", state);
        grabbed = state;
    });

    keyboard("s", (state) => {
        console.log("squeezed", state);
        squeezed = state;
    });

    let last_active_controller, last_active_inputsource;
    let { controller1, controller2 } = createVRcontrollers(scene, renderer, (current, src) => {
        // called if/when controllers connect
        cursor.matrixAutoUpdate = false;
        cursor.visible = false;
        last_active_controller = current;
        last_active_inputsource = src;
        console.log(`connected ${src.handedness} device`);
        renderer.xr.enabled = true; l
    });


    const lineFunc = createLine(scene);
    const flySpeedRotationFactor = 0.01;
    const flySpeedTranslationFactor = -0.02;


    let initialGrabbed, grabbedObject, hitObject, distance, inverseHand, inverseWorld;
    let differenceMatrix = new THREE.Matrix4();

    let deltaFlyRotation = new THREE.Quaternion();

    function updateRay() {
        if (last_active_controller) {
            cursor.matrix.copy(last_active_controller.matrix);
            grabbed = controller1.controller.userData.isSelecting || controller2.controller.userData.isSelecting;
            squeezed = controller1.controller.userData.isSqueezeing || controller2.controller.userData.isSqueezeing;
            direction.set(0, 0, -1);
        } else {
            cursor.updateMatrix();
            direction.set(0, 1, 0);
        }

        // Zerlegung der Matrix des Cursors in Translation, Rotation und Skalierung
        cursor.matrix.decompose(position, rotation, scale);
        // Anwendung der CursorRotation auf Richtung
        direction.applyQuaternion(rotation);

        // Startpunkt des "Laserstrahls" im Cursor        
        lineFunc(0, position);

        if (grabbedObject === undefined) {
            raycaster.set(position, direction);
            const intersects = raycaster.intersectObjects(objects);

            if (intersects.length) {
                lineFunc(1, intersects[0].point);
                hitObject = intersects[0].object;
                distance = intersects[0].distance;
            } else {
                // Endpunkt des "Laserstrahls": Startpunkt ist Cursor-Position, 
                // Endpunkt berechnet aus Richtung und Startpunkt
                endRay.addVectors(position, direction.multiplyScalar(20));
                lineFunc(1, endRay);
                hitObject = undefined;
            }
        }

        if (grabbed) {
            if (grabbedObject) {
                endRay.addVectors(position, direction.multiplyScalar(distance));
                lineFunc(1, endRay);
                // grabbedObject.matrix.copy(cursor.matrix.clone().multiply(initialGrabbed));
                grabbedObject.matrix.copy(inverseWorld.clone().multiply(cursor.matrix).multiply(initialGrabbed));

            } else if (hitObject) {
                grabbedObject = hitObject;
                // initialGrabbed = cursor.matrix.clone().invert().multiply(grabbedObject.matrix);

                inverseWorld = world.matrix.clone().invert();
                initialGrabbed = cursor.matrix.clone().invert().multiply(world.matrix).multiply(grabbedObject.matrix);
            }
        } else {
            grabbedObject = undefined;
        }

        if (squeezed) {
            if (inverseHand !== undefined) {
                let differenceHand = cursor.matrix.clone().multiply(inverseHand);
                differenceHand.decompose(position, rotation, scale);
                deltaFlyRotation.set(0, 0, 0, 1);
                deltaFlyRotation.slerp(rotation.conjugate(), flySpeedRotationFactor);
                differenceMatrix.compose(position.multiplyScalar(flySpeedTranslationFactor), deltaFlyRotation, scale);
                world.matrix.premultiply(differenceMatrix);
            } else {
                inverseHand = cursor.matrix.clone().invert();
            }


        } else {
            inverseHand = undefined;
        }

    }

    return { updateRay };

}