import { Events } from '../../events';

const settings = require('electron-settings');

export const configurationEvents = (ipcMain: Electron.IpcMain) => {
    ipcMain.on(Events.getConfiguration, (event: Electron.Event) => {
        event.returnValue = settings.getAll();
    });

    ipcMain.on(Events.editConfiguration, (event: Electron.Event, key: string, value: any) => {
        settings.set(key, value);
        event.sender.send(Events.editConfigurationSuccess, settings.getAll());
    });
};
