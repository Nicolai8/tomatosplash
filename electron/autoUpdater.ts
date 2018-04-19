import * as log from 'electron-log';

const { dialog } = require('electron');
const autoUpdater = require('electron-updater').autoUpdater;

let updater;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

const resetUpdater = () => {
  updater.enabled = true;
  updater = null;
};

autoUpdater.on('error', () => {
  dialog.showErrorBox('Error', 'An error occured');
  resetUpdater();
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    title: 'Found Updates',
    message: 'Found updates, do you want update now?',
    buttons: [ 'Yes', 'No' ]
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate();
    } else {
      resetUpdater();
    }
  });
});

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  });
  resetUpdater();
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded. Would you like to install them now?',
    buttons: [ 'Yes', 'No' ]
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      setImmediate(() => autoUpdater.quitAndInstall());
    } else {
      resetUpdater();
    }
  });
});

export const checkForUpdates = (menuItem) => {
  updater = menuItem;
  updater.enabled = false;
  autoUpdater.checkForUpdates();
};
