import { Events } from '../../events';
import Config from '../../models/config.model';
import { BrowserWindow } from 'electron';
import * as fs from 'fs';
import * as appRoot from 'app-root-path';
import * as mkdirp from 'mkdirp';

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

  ipcMain.on(Events.printToPDF, (event: Electron.Event) => {
    contents.printToPDF({ pageSize: 'A4', marginsType: 1, printBackground: false }, (error, data) => {
      if (error) {
        event.sender.send(Events.error, error);
        return;
      }
      const directoryPath = `${appRoot}/tmp`;
      if (!fs.existsSync(directoryPath)) {
        // noinspection TypeScriptValidateTypes
        mkdirp.sync(directoryPath);
      }
      const fileUrl = `${directoryPath}/receipt_${Date.now()}.pdf`;
      fs.writeFile(fileUrl, data, (error) => {
        if (error) {
          event.sender.send(Events.error, error.message);
          return;
        }

        const pdfWindow = new BrowserWindow({
          width: 1024,
          height: 800,
          webPreferences: {
            plugins: true
          }
        });
        pdfWindow.loadURL(`file:/${fileUrl}`);
      });
    });

    event.returnValue = true;
  });
};
