import { Events } from '../../events';

const settings = require('electron-settings');

export const configurationEvents = (ipcMain: Electron.IpcMain) => {
  ipcMain.on(Events.getConfiguration, (event: Electron.Event) => {
    event.returnValue = settings.getAll();
  });

  ipcMain.on(Events.editConfiguration, (event: Electron.Event, key: string, value: any) => {
    if (key) {
      settings.set(key, value);
      event.sender.send(Events.editConfigurationSuccess, settings.getAll());
    }
  });

  ipcMain.on(Events.editMultipleConfiguration, (event: Electron.Event, pairs: { [key: string]: any }) => {
    for (const key in pairs) {
      if (pairs.hasOwnProperty(key)) {
        settings.set(key, pairs[ key ]);
      }
    }

    event.sender.send(Events.editConfigurationSuccess, settings.getAll());
  });
};
