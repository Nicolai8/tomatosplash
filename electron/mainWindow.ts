import { BrowserWindow, ipcMain, screen } from 'electron';
import { createTray } from './tray';
import * as url from 'url';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import events from './events';
import * as path from 'path';

let mainWindow, isServing;

const args = process.argv.slice(1);
isServing = args.some(val => val === '--serve');
try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

export const createMainWindow = () => {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });
  mainWindow.maximize();
  mainWindow.setMenu(null);
  createTray(mainWindow, isServing);

  events.forEach((eventHandler) => eventHandler(ipcMain, mainWindow.webContents));

  if (isServing) {
    require('electron-reload')(__dirname, {});
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (isServing) {
    mainWindow.webContents.openDevTools();
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.minimize();
    mainWindow.hide();
    return false;
  });

  return mainWindow;
};
