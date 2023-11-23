import * as THREE from '../99_Lib/three.module.min.js';
console.log("ThreeJs " + THREE.REVISION);


window.onload = function () {
    let scene = new THREE.Scene();

    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    scene.add(light);

    let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);

    camera.position.set(0, 0, 1);
    scene.add(camera);

    const geometries = [
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.ConeGeometry(0.1, 0.4, 64),
        new THREE.CylinderGeometry(0.2, 0.2, 0.2, 64),
        new THREE.IcosahedronGeometry(0.2, 3),
        new THREE.PlaneGeometry(1, 1),
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
        const object = new THREE.Mesh(geometries[i], randomMaterial());
        object.position.set(x, y, z);
        object.castShadow = true;
        parent.add(object);
        return object;
    }

    const cursor = add(1, scene);
    let mouseButtons = [false, false, false, false];

    function toggle(ev, active) {
        mouseButtons[ev.which] = active;
        console.log(mouseButtons);
    }

    const MOVESCALE = 0.001;
    function onMouseMove(event) {
        const dx = event.movementX * MOVESCALE;
        const dy = event.movementY * MOVESCALE;
        const isRotation = event.ctrlKey;
        if (!isRotation && mouseButtons[1]) {
            cursor.position.x += dx;
            cursor.position.z += dy;
        }
        if (!isRotation && mouseButtons[3]) {
            cursor.position.x += dx;
            cursor.position.y += -dy;
        }

        if (isRotation && mouseButtons[1]) {
            cursor.rotation.x += dy;
            cursor.rotation.z += dx;
        }

    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mousedown', ev => toggle(ev, true));
    document.addEventListener('mouseup', ev => toggle(ev, false));
    document.addEventListener('contextmenu', ev => {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    });


    const groundGeo = new THREE.PlaneGeometry(20, 20, 64);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, -1, -4);
    ground.receiveShadow = true;

    scene.add(ground);
    ground.rotation.x = -Math.PI / 2;

    let renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    function render() {

        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(render);


};
