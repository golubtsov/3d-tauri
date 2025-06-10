// @ts-ignore
import p5 from 'p5';
import { open, message } from '@tauri-apps/plugin-dialog';
import { BaseDirectory, readTextFile } from '@tauri-apps/plugin-fs';
import { Menu } from '@tauri-apps/api/menu';

const START_ANGLE_X = 12;
const START_ANGLE_Y = 14;
const START_CAM_X = 0;
const START_CAM_Y = 0;
const START_CAM_POS = 600;

let cam: any = null;
let camPos = START_CAM_POS;
let camPosX = START_CAM_X;
let camPosY = START_CAM_Y;

let angleX = START_ANGLE_X;
let angleY = START_ANGLE_Y;

let model: any = null;
let stl: any = null;
let color = '#3584e4';

const menu = Menu.new({
    items: [
        {
            id: 'File',
            text: 'File',
            action: async () => {
                const file = await open({
                    multiple: false,
                    directory: false,
                });

                if (file) {
                    stl = await readTextFile(file, {
                        baseDir: BaseDirectory.AppConfig,
                    });
                } else {
                    await message('Файл не найден', {
                        title: 'Tauri',
                        kind: 'error',
                    });
                }
            },
        },
        {
            id: 'Image',
            text: 'Image',
            action: async (sketch: any) => {
                sketch.saveCanvas('model', 'png');
            },
        },
    ],
});

menu.then((m) => {
    m.setAsAppMenu().then(() => {});
});

new p5((sketch: any) => {
    sketch.setup = () => {
        sketch.createCanvas(
            sketch.windowWidth,
            sketch.windowHeight,
            sketch.WEBGL
        );

        cam = sketch.createCamera();
    };

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };

    sketch.draw = () => {
        sketch.background(180);

        cam.setPosition(camPosX, camPosY, camPos);
        sketch.setCamera(cam);

        if (sketch.mouseIsPressed) {
            angleX += (sketch.mouseX - sketch.pmouseX) * -0.01;
            angleY += (sketch.mouseY - sketch.pmouseY) * -0.01;
        }

        sketch.rotateX(angleY);
        sketch.rotateZ(angleX);

        sketch.ambientLight(255);
        sketch.pointLight(255, 255, 255, 400, 0, 400);
        sketch.normalMaterial();
        sketch.shininess(200);
        sketch.specularMaterial(200, 200, 255);
        sketch.fill(color);

        if (model === null) {
            if (stl !== null) {
                model = sketch.createModel(stl, '.stl');
            }
        } else {
            sketch.model(model);
        }
    };

    sketch.mouseWheel = (event: any) => {
        camPos += event.delta / 10;
    };

    sketch.keyPressed = () => {
        if (sketch.keyIsPressed) {
            // left
            if (sketch.keyCode === 37) {
                camPosX += 10;
            }

            // right
            if (sketch.keyCode === 39) {
                camPosX -= 10;
            }

            // down 40
            if (sketch.keyCode === 40) {
                camPosY -= 10;
            }

            // top
            if (sketch.keyCode === 38) {
                camPosY += 10;
            }
        }
    };
});
