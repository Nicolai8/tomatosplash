import { Events } from '../../events';

const Client = require('node-rest-client').Client;
const client = new Client();
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

const apiUrl = settings.get('dbConnectionString');
let isAuthenticated = false;
if (apiUrl) {
  // set isAuthorized on load
  client.post(`${apiUrl}/api/login/isAuthenticated`, { headers },
    checkForStatus((data) => {
      isAuthenticated = data.isAuthenticated;
    })
  ).on('error', (error) => {
    console.warn(`an error occurred when was trying to check isAuthenticated ${error}`);
  });
}

const login = (): Promise<boolean> => {
  const apiUrl = settings.get('dbConnectionString');
  const dbUsername = settings.get('dbUserName');
  const dbPassword = settings.get('dbPassword');

  return new Promise<boolean>((resolve, reject) => {
    client
      .post(`${apiUrl}/api/login`, {
        headers,
        data: {
          username: dbUsername,
          password: dbPassword,
        }
      }, checkForStatus(() => {
        isAuthenticated = true;
        resolve(true);
      }, reject))
      .on('error', (error) => {
        reject(error);
      });
  });
};

const errorHandler = (error) => {
  webContents.send(Events.error, error);
};

const apiCaller = (
  url: string, type: string,
  args: { [key: string]: any },
  callback: (data) => void,
  reject?: (error) => void
): void => {
  reject = reject || errorHandler;

  if (!isAuthenticated) {
    login().then(() => {
      apiCaller(url, type, args, callback, reject);
    }, reject);

    return;
  }

  args.headers = headers;
  const apiUrl = settings.get('dbConnectionString');
  client[ type ](`${apiUrl}${url}`, args, checkForStatus(callback, reject))
    .on('error', reject);
};

export const initApiCaller = (contents: Electron.WebContents) => {
  webContents = contents;
};

export default apiCaller;
