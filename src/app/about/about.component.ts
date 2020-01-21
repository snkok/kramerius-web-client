import { forkJoin } from 'rxjs/observable/forkJoin';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translator } from 'angular-translator';
import { AppSettings } from '../services/app-settings';
import { Router } from '@angular/router';
import {versionInfo} from "../version-info";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {



  data = '';
  dataCs = '';
  dataEn = '';
  dataSk = '';
  loading: boolean;
  versionInfo;

  constructor(private http: HttpClient, private translator: Translator, private appSettings: AppSettings, private router: Router) {
    if (!appSettings.aboutPage) {
      this.router.navigate([this.appSettings.getRouteFor('')]);
    }
  }

  ngOnInit() {
    this.loading = true;
    /*this.translator.languageChanged.subscribe(() => {
      this.localeChanged();
    });*/
    const reqSk = this.http.get(this.appSettings.aboutPage['sk'], { observe: 'response', responseType: 'text' })
    .map(response => response['body']);
    // const reqEn = this.http.get(this.appSettings.aboutPage['en'], { observe: 'response', responseType: 'text' })
    // .map(response => response['body']);
    forkJoin([reqSk])
    .subscribe( result => {
      this.dataSk = result[0];
      // this.dataEn = result[1];
      // this.localeChanged();
      this.data = this.dataSk;
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
    this.versionInfo = versionInfo;
  }

 /* private localeChanged() {
    if (this.translator.language === 'cs') {
      this.data = this.dataCs;
    } else {
      this.data = this.dataEn;
    }
  }*/

}
