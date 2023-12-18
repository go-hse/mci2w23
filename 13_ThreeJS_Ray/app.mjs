import * as THREE from '../99_Lib/three.module.min.js';
import { mousecursor } from './mousecursor.mjs';
import { Ray } from './ray.mjs';

console.log("ThreeJs " + THREE.REVISION);

let geometries = [
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    new THREE.ConeGeometry(0.1, 0.4, 64),
    new THREE.CylinderGeometry(0.2, 0.2, 0.2, 64),
    new THREE.IcosahedronGeometry(0.2, 3),
    new THREE.TorusKnotGeometry(.2, .03, 50, 16),
    new THREE.TorusGeometry(0.2, 0.04, 64, 32)
];

function randomMaterial() {
    return new THREE.MeshStandardMaterial({
        color: Math.random() * 0xff3333,
        roughness: 0.7,
        metalness: 0.0
    });
}

function add(i, parent, x = 0, y = 0, z = 0) {
    let object = new THREE.Mesh(geometries[i], randomMaterial());
    object.position.set(x, y, z);
    object.updateMatrix();
    object.matrixAutoUpdate = false;
    parent.add(object);
    return object;
}


window.onload = function () {
    let scene = new THREE.Scene();
    // 
    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 2, 0);
    scene.add(light);
    //
    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 1);
    scene.add(camera);
    // 

    let cursor = add(1, scene);
    mousecursor(cursor);

    let objects = [];
    let x = -0.5, y = 0, z = 0, delta = 0.3;
    for (let i = 0; i < 5; ++i) {
        objects.push(add(i, scene, x, y, z)); x += delta;
    }

    let ray = Ray(scene, cursor, objects);

    let renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    function render() {
        ray.updateRay();
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(render);
};
