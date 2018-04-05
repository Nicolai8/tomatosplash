import { Events } from '../../events';
import Config from '../../models/config.model';

const settings = require('electron-settings');
const keytar = require('keytar');
const serviceName = 'Tomatosplash';

export const configurationEvents = (ipcMain: Electron.IpcMain, contents: Electron.WebContents) => {
  ipcMain.on(Events.getConfiguration, (event: Electron.Event) => {
    const result: Config = settings.getAll();
    keytar.getPassword(serviceName, result.dbUserName)
      .then((password) => {
        result.dbPassword = password;
        event.returnValue = result;
      })
      .catch((error) => {
        event.sender.send(Events.error, error && error.message);
        event.returnValue = {};
      });
  });

  ipcMain.on(Events.editConfiguration, (event: Electron.Event, newConfig: Config) => {
    const currentConfig: Config = settings.getAll();

    keytar.deletePassword(serviceName, currentConfig.dbUserName)
      .then(() => {
        return keytar.setPassword(serviceName, newConfig.dbUserName, newConfig.dbPassword);
      })
      .then(() => {
        const result = Object.assign({}, newConfig);
        delete newConfig.dbPassword;
        settings.setAll(<any>newConfig);
        event.sender.send(Events.editConfigurationSuccess, result);
      })
      .catch((error) => {
        event.sender.send(Events.error, error && error.message);
      });
  });

  ipcMain.on(Events.showDevConsole, (event: Electron.Event) => {
    if (!contents.isDevToolsOpened()) {
      contents.openDevTools();
    }
    event.returnValue = true;
  });
};
