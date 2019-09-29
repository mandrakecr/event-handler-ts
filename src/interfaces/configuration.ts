export interface IConfiguration {
  api?: IConfigurationApi;
  user_info_api?: IConfigurationUserInfoAPI;
  events?: [IConfigurationEvent];
}

export interface IConfigurationApi {
  method: null | 'Bearer';
  // Technical debt define the possibities
  method_data: any;
  endpoint: string;
}

export interface IConfigurationUserInfoAPI {
  endpoint: string;
}

export interface IConfigurationEvent {
  target: string;
  event: 'click' | 'page-load' | 'hover' | 'stay-time';
  event_id?: string;
}
