import { app, Menu, Tray, dialog } from 'electron';
import * as path from 'path';
import { checkForUpdates } from './autoUpdater';

let trayIcon: Electron.Tray;
const iconPath = path.join(__dirname, '../assets/icon.png');

export const createTray = (mainWindow: Electron.BrowserWindow, isServing: boolean) => {
  trayIcon = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
        mainWindow.maximize();
      }
    },
    {
      label: 'Toggle DevTools',
      enabled: isServing,
      click: () => {
        mainWindow.show();
        mainWindow.webContents.toggleDevTools();
      }
    },
    {
      label: 'About',
      role: 'about',
      click: () => {
        dialog.showMessageBox({
          type: 'info',
          message: `${app.getName()} v${app.getVersion().toString()}`,
          title: 'About'
        });
      }
    },
    {
      label: 'Check for updates...',
      click: checkForUpdates
    },
    {
      label: 'Quit',
      click: function () {
        app.quit();
      }
    }
  ]);
  trayIcon.setToolTip(app.getName());
  trayIcon.setContextMenu(contextMenu);

  trayIcon.on('double-click', () => {
    if (!mainWindow.isVisible()) {
      mainWindow.show();
      mainWindow.maximize();
    }
  });
};
