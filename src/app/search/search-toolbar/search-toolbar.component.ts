import { AppSettings } from './../../services/app-settings';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchService } from './../../services/search.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html'
})
export class SearchToolbarComponent implements OnInit {

  constructor(public searchService: SearchService,
    public analytics: AnalyticsService,
    public appSettings: AppSettings) {
  }

  ngOnInit() {
  }


  // toggleElement(id) {
  //   if (id === 'app-chart-bar') {
  //     this.state.chartBarToggle();
  //     this.state.showingCalendar = false;
  //     $('#app-calendar').hide();
  //   } else if (id === 'app-calendar') {
  //     this.state.calendarToggle();
  //     this.state.showingChartBar = false;
  //     $('#app-chart-bar').hide();
  //   }
  //   $('#' + id).toggleClass('active');
  //   $('#' + id).slideToggle('fast');
  // }

  toggleFilters() {
    if (this.searchService.activeMobilePanel === 'results') {
      this.searchService.activeMobilePanel = 'filters';
    } else {
      this.searchService.activeMobilePanel = 'results';
    }
  }
}
