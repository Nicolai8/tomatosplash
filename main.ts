import { app } from 'electron';
import { createMainWindow } from './electron/mainWindow';
import * as log from 'electron-log';

try {
  let mainWindow: Electron.BrowserWindow;
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    mainWindow = createMainWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      mainWindow = createMainWindow();
    }
  });

} catch (e) {
  log.error(JSON.stringify(e));
  // Catch Error
  // throw e;
}
