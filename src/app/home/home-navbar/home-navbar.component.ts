import { AnalyticsService } from '../../services/analytics.service';
import { AuthService } from '../../services/auth.service';
import { AppSettings } from '../../services/app-settings';
import { LibrarySearchService } from '../../services/library-search.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Translator } from 'angular-translator';
import { AppState } from '../../app.state';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
})
export class HomeNavbarComponent implements OnInit {
  mobileSearchBarExpanded = false;
  profile: KeycloakProfile;

  constructor(
    public translator: Translator,
    public router: Router,
    public authService: AuthService,
    public appSettings: AppSettings,
    public service: LibrarySearchService,
    public analytics: AnalyticsService,
    public state: AppState,
    public keycloakService: KeycloakService) {
  }

  ngOnInit() {
    this.keycloakService.isLoggedIn().then(value => {
      if (value) {
        this.keycloakService.loadUserProfile().then(profile => {
          this.profile = profile;
        })
      }
    })
  }

  onLanguageChanged(lang: string) {
    this.analytics.sendEvent('navbar', 'language', lang);
    localStorage.setItem('lang', lang);
    this.translator.language = lang;
  }

  toggleMobileSearchBar() {
    this.mobileSearchBarExpanded = !this.mobileSearchBarExpanded;
  }

  logout() {
    this.analytics.sendEvent('navbar', 'logout');
    this.keycloakService.logout().then(value => {
      this.profile = null;
    });
  }
}
