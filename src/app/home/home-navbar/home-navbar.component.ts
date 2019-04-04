import { AnalyticsService } from '../../services/analytics.service';
import { AuthService } from '../../services/auth.service';
import { AppSettings } from '../../services/app-settings';
import { LibrarySearchService } from '../../services/library-search.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Translator } from 'angular-translator';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
})
export class HomeNavbarComponent implements OnInit {
  mobileSearchBarExpanded = false;

  constructor(
    public translator: Translator,
    public router: Router,
    public authService: AuthService,
    public appSettings: AppSettings,
    public service: LibrarySearchService,
    public analytics: AnalyticsService,
    public state: AppState) {
  }

  ngOnInit() {
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
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
