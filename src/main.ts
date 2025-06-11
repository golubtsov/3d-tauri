// @ts-ignore
import p5 from 'p5';
import { handleCameraMovement, setupCamera } from './camera.ts';
import { setupEventHandlers } from './events.ts';
import { renderModel } from './render.ts';
import { setupMenu } from './menu.ts';
// import { setDefaultStlContent } from './menu.ts';

setupMenu().then(() => {});

// setDefaultStlContent().then(() => {});

new p5((sketch: any) => {
    sketch.setup = () => {
        sketch.createCanvas(
            sketch.windowWidth,
            sketch.windowHeight,
            sketch.WEBGL,
        );
        setupEventHandlers(sketch);
    };

    sketch.draw = () => {
        setupCamera(sketch);
        setupEventHandlers(sketch);
        handleCameraMovement(sketch);
        renderModel(sketch);
    };

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };
});
