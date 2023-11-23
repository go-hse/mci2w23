import * as THREE from '../99_Lib/three.module.min.js';
console.log("ThreeJs " + THREE.REVISION);


window.onload = function () {
    let scene = new THREE.Scene();


    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 6, 0);
    scene.add(light);

    let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);

    camera.position.set(0, 0, 1);
    scene.add(camera);


    let box = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        new THREE.MeshStandardMaterial({
            color: Math.random() * 0xff3333,
            roughness: 0.7,
            metalness: 0.0,
        }));
    scene.add(box);

    box.position.z = -1;

    let renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    function render() {
        box.rotation.x += 0.04;
        box.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(render);


};
