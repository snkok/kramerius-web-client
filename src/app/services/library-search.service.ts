import { KrameriusApiService } from './kramerius-api.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CompleterItem, CompleterData } from 'ng2-completer';

@Injectable()
export class LibrarySearchService extends Subject<CompleterItem[]> implements CompleterData {

    constructor(private krameriusApiService: KrameriusApiService) {
        super();
    }
    public search(term: string): void {
        this.krameriusApiService.getSearchAutocomplete(term).subscribe(results => {
            const items = [];
            const cache = {};
            for (const item of results) {
                if (cache[item['dc.title']]) {
                    continue;
                }
                let index = item['dc.title'].toLowerCase().indexOf(term.toLowerCase());
                if (index < 0) {
                    index = 1000 + item['dc.title'].length;
                }
                items.push({index: index, item: item});
                cache[item['dc.title']]  = true;
            }
            items.sort(function(a, b) {
                if (a.index < b.index) {
                    return -1;
                }
                if (a.index > b.index) {
                    return 1;
                }
                return 0;
            });
            const matches: CompleterItem[] = [];
            for (const item of items) {
                matches.push(this.convertToItem(item.item));
            }
            this.next(matches);
        });
    }

    public cancel() {
        // Handle cancel
    }

    public convertToItem(data: any): CompleterItem | null {
        if (!data) {
            return null;
        }
        // data will be string if an initial value is set
        return {
            title: data['dc.title'],
            // image : this.krameriusApiService.getThumbUrl(data.PID),
            originalObject: data
        } as CompleterItem;
    }
}
