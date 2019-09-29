declare var Fingerprint2: any;

import {
  IConfiguration,
  IConfigurationEvent,
} from './interfaces/configuration';

export class MDKCR_Event_Tracker {
  private configuration: IConfiguration;
  private fingerprint: string;

  constructor(configuration: IConfiguration = {}) {
    this.configuration = { ...this.configuration, ...configuration };
    new Fingerprint2().get((result: any) => {
      this.fingerprint = result;

      this.loadEvents();
    });
  }

  private loadEvents(): void {
    if (this.configuration.events) {
      this.configuration.events.forEach((event: IConfigurationEvent) => {
        this.loadEvent(event);
      });
    }
  }

  public loadEvent(event: IConfigurationEvent): void {
    const element = document.querySelector(event.target);
    event.event_id =
      Date.now().toString(10) +
      Math.random()
        .toString(10)
        .substr(2, 9);
    element.addEventListener(event.event, () => {
      this.processEvent(event);
    });
  }

  public processEvent(
    event: IConfigurationEvent,
    isClosure: boolean = false,
  ): void {
    if (
      !this.configuration.user_info_api ||
      !this.configuration.user_info_api.endpoint
    )
      return;

    const payload = {
      fingerprint: this.fingerprint,
      event: event,
      time: Math.floor(Date.now() / 1000),
      isClosure: isClosure,
    };
    const request = this.buildRequest(payload);
    // Right now we are not processing the response at some point we will add more functionality here
    fetch(this.configuration.user_info_api.endpoint, request).then(() => {});
  }

  // This function only returns the request, at some point this will be grown into parsing from different options
  public buildRequest(payload: any) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.configuration.api.method === 'Bearer') {
      headers['Authorization'] =
        'Bearer ' + this.configuration.api.method_data.token;
    }

    return {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    };
  }

  public buildRequestPayload(payload: any) {}
}
