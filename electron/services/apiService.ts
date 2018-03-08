import { Events } from '../../events';

const Client = <any>require('node-rest-client').Client;
let client = new Client();
const headers = {
  'Content-Type': 'application/json',
  'x-requested-with': 'XMLHttpRequest'
};
const settings = require('electron-settings');
let webContents: Electron.WebContents = null;

const checkForStatus = (callback: (data) => void, reject?: (message: string) => void) => {
  return (data, response) => {
    if (response.statusCode === 200) {
      callback && callback(data);
    } else {
      reject && reject(data.message || response.statusMessage);
    }
  }
};

const errorHandler = (error) => {
  webContents.send(Events.error, error && error.message || 'basic error message');
};

const apiCaller = (
  url: string, type: string,
  args: { [key: string]: any },
  callback: (data) => void,
  reject?: (error) => void
): void => {
  reject = reject || errorHandler;

  client.options.user = settings.get('dbUserName');
  client.options.password = settings.get('dbPassword');

  args.headers = headers;
  const apiUrl = settings.get('dbConnectionString');
  client[ type ](`${apiUrl}${url}`, args, checkForStatus(callback, reject))
    .on('error', reject);
};

export const initApiCaller = (contents: Electron.WebContents) => {
  webContents = contents;
};

export default apiCaller;
