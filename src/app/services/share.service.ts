import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';

@Injectable()
export class ShareService {

  getPersistentLink(uuid: string, doctype: string | number): string {
    if (!uuid) {
      return;
    }

    return location.protocol + '//' + location.host + ((doctype === 'periodical' || doctype === 'periodicalvolume') ? '/periodical/' : '/view/') + uuid;
  }

  getPersistentLinkByUrl(): string {
    return location.href;
  }
}
