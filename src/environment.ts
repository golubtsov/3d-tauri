interface AppState {
    camera: any;
    camPos: number;
    camPosX: number;
    camPosY: number;
    angleX: number;
    angleY: number;
    model: any;
    stlContent: string | null;
    color: string;
    isDragging: boolean;
}

const START_ANGLE_X = 11.6;
const START_ANGLE_Y = 13.6;
const START_CAM_X = 0;
const START_CAM_Y = 0;
const START_CAM_POS = 600;

export const initialState: AppState = {
    camera: null,
    camPos: START_CAM_POS,
    camPosX: START_CAM_X,
    camPosY: START_CAM_Y,
    angleX: START_ANGLE_X,
    angleY: START_ANGLE_Y,
    model: null,
    stlContent: null,
    color: '#3584e4',
    isDragging: false,
};

export let state: AppState = { ...initialState };
