import { state } from './environment.ts';

export function renderModel(sketch: any) {
    sketch.background(180);

    sketch.ambientLight(60);
    sketch.directionalLight(255, 255, 255, -1, 1, -1);
    sketch.pointLight(255, 255, 255, 400, 0, 400);

    sketch.normalMaterial();
    sketch.shininess(50);
    sketch.specularMaterial(200, 200, 255);
    sketch.fill(state.color);

    sketch.rotateX(state.angleY);
    sketch.rotateZ(state.angleX);

    if (state.model === null && state.stlContent !== null) {
        try {
            state.model = sketch.createModel(state.stlContent, '.stl');
        } catch (error) {
            console.error('Error loading model:', error);
        }
    } else if (state.model) {
        sketch.model(state.model);
    }
}
