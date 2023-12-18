import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

// from three.js\examples\webxr_vr_ballshooter.html
export function createVRcontrollers(scene, renderer, connect_cb) {
    const controllerModelFactory = new XRControllerModelFactory();

    function getController(id) {
        let controller = renderer.xr.getController(id);
        controller.addEventListener('selectstart', () => {
            console.log(`Controller ${id} selects`);
            controller.userData.isSelecting = true;
        });
        controller.addEventListener('selectend', () => {
            console.log(`Controller ${id} select ends`);
            controller.userData.isSelecting = false;
        });
        controller.addEventListener('squeezestart', () => {
            console.log(`Controller ${id} squeezes`);
            controller.userData.isSqueezeing = true;
        });
        controller.addEventListener('squeezeend', () => {
            console.log(`Controller ${id} squeeze ends`);
            controller.userData.isSqueezeing = false;
        });
        controller.addEventListener('connected', function (event) {
            console.log(`controller connects ${id} mode ${event.data.targetRayMode} ${event.data.handedness} hand`);
            // inform app that we have a controller
            connect_cb(controller, event.data);
        });
        controller.addEventListener('disconnected', () => {
            controller.remove(controller.children[0]);
            console.log(`controller disconnects ${id} `);
        });

        scene.add(controller);

        let controllerGrip = renderer.xr.getControllerGrip(id);
        controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
        scene.add(controllerGrip);
        return { controller, controllerGrip };
    }
    let controller1 = getController(0);
    let controller2 = getController(1);

    return { controller1, controller2 };
}

