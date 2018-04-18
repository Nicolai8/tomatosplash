import { app } from 'electron';
import { Events } from '../../events';
import Config from '../../models/config.model';
import * as log from 'electron-log';

const settings = require('electron-settings');
const keytar = require('keytar');
const serviceName = app.getName();

export const configurationEvents = (ipcMain: Electron.IpcMain, contents: Electron.WebContents) => {
  ipcMain.on(Events.getConfiguration, (event: Electron.Event) => {
    const result: Config = settings.getAll();
    if (!result.dbUserName) {
      event.returnValue = result;
      return;
    }
    keytar.getPassword(serviceName, result.dbUserName)
      .then((password) => {
        result.dbPassword = password;
        event.returnValue = result;
      })
      .catch((error) => {
        log.warn(JSON.stringify(error));
        event.sender.send(Events.error, error && error.message);
        event.returnValue = {};
      });
  });

  ipcMain.on(Events.editConfiguration, (event: Electron.Event, newConfig: Config) => {
    const currentConfig: Config = settings.getAll();

    let promise = Promise.resolve();
    if (currentConfig.dbUserName) {
      promise = keytar.deletePassword(serviceName, currentConfig.dbUserName);
    }
    promise
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
        log.warn(JSON.stringify(error));
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
