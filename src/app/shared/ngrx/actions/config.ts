import Config from '../../models/config.model';
import { ExtendedAction } from './action';

export enum ConfigActionTypes {
  GetConfig = '[Config] GetConfig',
  GetConfigSuccess = '[Config] GetConfigSuccess',
  SetConfig = '[Config] SetConfig',
  SetConfigSuccess = '[Config] SetConfigSuccess',
  SetConfigKey = '[Config] SetConfigKey',
  SetConfigKeySuccess = '[Config] SetConfigKeySuccess',
}

export class GetConfig implements ExtendedAction {
  readonly type = ConfigActionTypes.GetConfig;
}

export class GetConfigSuccess implements ExtendedAction {
  readonly type = ConfigActionTypes.GetConfigSuccess;

  constructor(public config: Config) {
  }
}

export class SetConfig implements ExtendedAction {
  readonly type = ConfigActionTypes.SetConfig;

  constructor(public config: Config) {
  }
}

export class SetConfigSuccess implements ExtendedAction {
  readonly type = ConfigActionTypes.SetConfigSuccess;

  constructor(public config: Config) {
  }
}

export class SetConfigKey implements ExtendedAction {
  readonly type = ConfigActionTypes.SetConfigKey;

  constructor(public key: string, public value: any) {
  }
}

export class SetConfigKeySuccess implements ExtendedAction {
  readonly type = ConfigActionTypes.SetConfigKeySuccess;

  constructor(public key: string, public value: any) {
  }
}
