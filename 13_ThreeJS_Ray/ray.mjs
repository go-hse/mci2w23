import * as THREE from '../99_Lib/three.module.min.js';
import { keyboard } from './keyboard.mjs';


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

export function Ray(scene, cursor, objects) {

    let position = new THREE.Vector3();
    let rotation = new THREE.Quaternion();
    let scale = new THREE.Vector3();
    let endRay = new THREE.Vector3();
    let direction = new THREE.Vector3();

    const raycaster = new THREE.Raycaster();

    let grabbed = false;
    keyboard(" ", (state) => {
        console.log("grabbed", state);
        grabbed = state;
    });


    const lineFunc = createLine(scene);

    let initialGrabbed, grabbedObject, hitObject, distance;

    function updateRay() {
        cursor.updateMatrix();
        // Zerlegung der Matrix des Cursors in Translation, Rotation und Skalierung
        cursor.matrix.decompose(position, rotation, scale);
        // Richtung nach oben - wie Cursor Ausgangsrichtung
        direction.set(0, 1, 0);
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
                grabbedObject.matrix.copy(cursor.matrix.clone().multiply(initialGrabbed));
            } else if (hitObject) {
                grabbedObject = hitObject;
                initialGrabbed = cursor.matrix.clone().invert().multiply(grabbedObject.matrix);
            }
        } else {
            grabbedObject = undefined;
        }

    }

    return { updateRay };

}