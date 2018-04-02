import { Events } from '../../events';
import Config from '../../models/config.model';
import { BrowserWindow, dialog } from 'electron';
import * as fs from 'fs';
import * as appRoot from 'app-root-path';
import * as mkdirp from 'mkdirp';

const settings = require('electron-settings');

export const printPDFDirectory = `${appRoot}/tmp/pdf`;
export const printDocxDirectory = `${appRoot}/tmp/docx`;
export const docxReceiptTemplatePath = `${appRoot}/receiptTemplate.docx`;
export const docxReportTemplatePath = `${appRoot}/reportTemplate.docx`;

const setDocxTemplate = (event: Electron.Event, templatePath: string, successEventName: string) => {
  const selectedPath = dialog.showOpenDialog({
    title: 'Upload template',
    filters: [
      { name: 'MS Word 2007+', extensions: [ 'docx' ] }
    ]
  });
  if (!selectedPath) {
    return;
  }

  const readStream = fs.createReadStream(selectedPath.toString());
  const writeStream = fs.createWriteStream(templatePath);
  new Promise((resolve, reject) => {
    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);

    readStream.pipe(writeStream);
  })
    .then(() => {
      event.sender.send(successEventName);
    })
    .catch((error) => {
      event.sender.send(Events.error, error && error.message);
    });
};

const getDocxTemplate = (event: Electron.Event, templatePath: string) => {
  const selectedPath = dialog.showSaveDialog({
    defaultPath: templatePath
  });
  if (!selectedPath) {
    return;
  }

  const readStream = fs.createReadStream(templatePath);
  const writeStream = fs.createWriteStream(selectedPath.toString());
  new Promise((resolve, reject) => {
    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);

    readStream.pipe(writeStream);
  })
    .catch((error) => {
      event.sender.send(Events.error, error && error.message);
    });
};

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
    contents.printToPDF({
      pageSize: 'A4',
      marginsType: 1,
      printBackground: false,
    }, (error, data) => {
      if (error) {
        event.sender.send(Events.error, error);
        return;
      }
      if (!fs.existsSync(printPDFDirectory)) {
        // noinspection TypeScriptValidateTypes
        mkdirp.sync(printPDFDirectory);
      }
      const fileUrl = `${printPDFDirectory}/receipt_${Date.now()}.pdf`;
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
  });

  ipcMain.on(Events.setPrintReceiptDocxTemplate, (event: Electron.Event) => {
    setDocxTemplate(event, docxReceiptTemplatePath, Events.setPrintReceiptDocxTemplateSuccess);
  });

  ipcMain.on(Events.getPrintReceiptDocxTemplate, (event: Electron.Event) => {
    getDocxTemplate(event, docxReceiptTemplatePath);
  });

  ipcMain.on(Events.setPrintReportDocxTemplate, (event: Electron.Event) => {
    setDocxTemplate(event, docxReportTemplatePath, Events.setPrintReportDocxTemplateSuccess);
  });

  ipcMain.on(Events.getPrintReportDocxTemplate, (event: Electron.Event) => {
    getDocxTemplate(event, docxReportTemplatePath);
  });
};
