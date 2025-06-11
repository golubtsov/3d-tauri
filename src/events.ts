import { initialState, state } from './environment.ts';

export function setupEventHandlers(sketch: any) {
    sketch.mousePressed = () => {
        state.isDragging = true;
    };

    sketch.mouseReleased = () => {
        state.isDragging = false;
    };

    sketch.mouseWheel = (event: WheelEvent) => {
        state.camPos += event.deltaY / 10;
        return false; // Prevent page scrolling
    };

    sketch.keyPressed = () => {
        const moveStep = 10;

        switch (sketch.keyCode) {
            case 37: // Left arrow
                state.camPosX += moveStep;
                break;
            case 39: // Right arrow
                state.camPosX -= moveStep;
                break;
            case 40: // Down arrow
                state.camPosY -= moveStep;
                break;
            case 38: // Up arrow
                state.camPosY += moveStep;
                break;
            case 82: // R key - reset view
                Object.assign(state, initialState);
                break;
        }
    };
}
