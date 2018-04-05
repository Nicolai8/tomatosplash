export default interface Config {
  cashMachineId: string;
  dbConnectionString: string;
  dbUserName: string;
  dbPassword: string;

  [key: string]: any;
}
