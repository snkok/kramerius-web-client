import { Injectable } from '@angular/core';

declare var APP_GLOBAL: any;

@Injectable()
export class AnalyticsService {

  sendEvent(category: string, action: string, label: string = '') {
    if (APP_GLOBAL.ga && 0 < APP_GLOBAL.ga.length) {
      (<any>window).gaaa('send', 'event', category, action, label);
    }
  }

}
