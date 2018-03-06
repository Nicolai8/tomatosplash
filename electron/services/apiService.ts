import { Events } from '../../events';

const Client = require('node-rest-client').Client;
const client = new Client();
const headers = { 'Content-Type': 'application/json' };
const settings = require('electron-settings');

const apiUrl = settings.get('dbConnectionString');
let webContents: Electron.WebContents = null;
let isAuthorized = false;

if (apiUrl) {
  // set isAuthorized on load
  client.post(`${apiUrl}/api/login/isAuthenticated`, { headers }, (data) => {
    isAuthorized = data;
  }).on('error', (error) => {
    console.warn(`an error occurred when was trying to check isAuthenticated ${error}`);
    isAuthorized = false;
  });
}

const login = (): Promise<boolean> => {
  const dbUsername = settings.get('dbUserName');
  const dbPassword = settings.get('dbPassword');

  return new Promise<boolean>((resolve, reject) => {
    client.post(`${apiUrl}/api/login`, {
      headers,
      data: {
        username: dbUsername,
        password: dbPassword,
      }
    }, (data) => {
      isAuthorized = data.isAuthenticated;
      isAuthorized ? resolve(true) : reject('user is not authorized');
    }).on('error', (error) => {
      reject(error);
    });
  });
};

const errorHandler = (error) => {
  webContents.send(Events.error, error);
};

const apiCaller = (url: string, type: string, args: { [key: string]: any }, callback: (data, response) => void): void => {
  if (!isAuthorized) {
    login().then(() => {
      apiCaller(url, type, args, callback);
    }, errorHandler);

    return;
  }

  args.headers = headers;
  client[ type ](`${apiUrl}${url}`, args, callback)
    .on('error', errorHandler);
};

export const initApiCaller = (contents: Electron.WebContents) => {
  webContents = contents;
};

export default apiCaller;
