import Config from '../../../../models/config.model';
import { ExtendedAction } from './action';

export enum ConfigActionTypes {
  GetConfig = '[Config] GetConfig',
  GetConfigSuccess = '[Config] GetConfigSuccess',
  SetConfigKeys = '[Config] SetConfigKeys',
  SetConfigKeysSuccess = '[Config] SetConfigKeysSuccess',
}

export class GetConfig implements ExtendedAction {
  readonly type = ConfigActionTypes.GetConfig;
}

export class GetConfigSuccess implements ExtendedAction {
  readonly type = ConfigActionTypes.GetConfigSuccess;

  constructor(public config: Config) {
  }
}

export class SetConfigKeys implements ExtendedAction {
  readonly type = ConfigActionTypes.SetConfigKeys;

  constructor(public pairs: { [ key: string ]: any }) {
  }
}

export class SetConfigKeysSuccess implements ExtendedAction {
  readonly type = ConfigActionTypes.SetConfigKeysSuccess;

  constructor(public config: Config) {
  }
}
