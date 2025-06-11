import { Menu } from '@tauri-apps/api/menu';
import { invoke } from '@tauri-apps/api/core';
import { message, open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { initialState, state } from './environment.ts';

async function loadSTLFile() {
    try {
        const file = await open({
            multiple: false,
            directory: false,
            filters: [{ name: 'STL Files', extensions: ['stl'] }],
        });

        if (file) {
            state.stlContent = await readTextFile(file);
            state.model = null;
        }
    } catch (error) {
        await message(`Error loading file: ${error}`, {
            title: 'File Error',
            kind: 'error',
        });
    }
}

export async function setDefaultStlContent() {
    if (!state.stlContent) {
        state.stlContent = <string>await invoke('read_default_model');
    }
}

export async function setupMenu() {
    try {
        const menu = await Menu.new({
            items: [
                {
                    id: 'open',
                    text: 'Open STL',
                    action: loadSTLFile,
                },
                {
                    id: 'reset',
                    text: 'Reset View',
                    action: async () => {
                        const { angleX, angleY, camPos, camPosX, camPosY } =
                            initialState;
                        Object.assign(state, {
                            angleX,
                            angleY,
                            camPos,
                            camPosX,
                            camPosY,
                        });
                    },
                },
            ],
        });
        await menu.setAsAppMenu();
    } catch (error) {
        console.error('Menu setup failed:', error);
    }
}
