export default interface Config {
  cashMachineId: string;
  dbConnectionString: string;
  dbUserName: string;
  dbPassword: string;
  language: string;

  [key: string]: any;
}
