import { KrameriusApiService } from './../../../services/kramerius-api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {
  @Input() item;
  @Input() container;
  @Output() itemClicked = new EventEmitter();

  constructor(
    private krameriusApiService: KrameriusApiService,
    private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  getThumb() {
    const url = this.krameriusApiService.getThumbUrl(this.item.pid);
    return url;
  }

  onItemClick() {
    this.itemClicked.emit();
  }

}
