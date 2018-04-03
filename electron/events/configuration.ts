import { Events } from '../../events';
import Config from '../../models/config.model';

const settings = require('electron-settings');

export const configurationEvents = (ipcMain: Electron.IpcMain, contents: Electron.WebContents) => {
  ipcMain.on(Events.getConfiguration, (event: Electron.Event) => {
    event.returnValue = settings.getAll();
  });

  ipcMain.on(Events.editConfiguration, (event: Electron.Event, key: string, value: any) => {
    if (key) {
      settings.set(key, value);
      event.sender.send(Events.editConfigurationSuccess, settings.getAll());
    }
  });

  ipcMain.on(Events.editMultipleConfiguration, (event: Electron.Event, pairs: Config) => {
    for (const key in pairs) {
      if (pairs.hasOwnProperty(key)) {
        settings.set(key, pairs[ key ]);
      }
    }

    event.sender.send(Events.editConfigurationSuccess, settings.getAll());
  });

  ipcMain.on(Events.showDevConsole, (event: Electron.Event) => {
    if (!contents.isDevToolsOpened()) {
      contents.openDevTools();
    }
    event.returnValue = true;
  });
};
