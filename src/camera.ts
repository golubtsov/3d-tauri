import { state } from './environment.ts';

export function setupCamera(sketch: any) {
    state.camera = sketch.createCamera();
    state.camera.setPosition(state.camPosX, state.camPosY, state.camPos);
    sketch.setCamera(state.camera);
}

export function handleCameraMovement(sketch: any) {
    if (sketch.mouseIsPressed && state.isDragging) {
        state.angleX += (sketch.mouseX - sketch.pmouseX) * -0.01;
        state.angleY += (sketch.mouseY - sketch.pmouseY) * -0.01;
    }
}
