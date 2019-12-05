import { AppSettings } from './app-settings';
import { SearchQuery } from './../search/search_query.model';
import { PeriodicalFtItem } from './../model/periodicalftItem.model';
import { DocumentItem } from './../model/document_item.model';
import { PeriodicalItem } from './../model/periodicalItem.model';
import { Injectable } from '@angular/core';


@Injectable()
export class SolrService {

    constructor(private appSettings: AppSettings) {
    }


    periodicalItem(doc): PeriodicalItem {
        const item = new PeriodicalItem();
        item.uuid = doc['PID'];
        item.public = doc['dostupnost'] === 'public';
        item.doctype = doc['fedora.model'];
        const details = doc['details'];
        if (item.doctype === 'periodicalvolume') {
            if (details && details[0]) {
                const parts = details[0].split('##');
                if (parts.length >= 2) {
                    item.title = parts[0];
                    item.subtitle = parts[1];
                }
            }
        } else if (item.doctype === 'periodicalitem') {
            if (details && details[0]) {
                const parts = details[0].split('##');
                if (parts.length === 4) {
                    item.title = parts[2];
                    item.subtitle = parts[1];
                    if (!item.subtitle) {
                        item.subtitle = parts[3];
                    }
                }
            }
        } else if (item.doctype === 'monographunit') {
            if (details && details[0]) {
                const parts = details[0].split('##');
                if (parts.length === 2) {
                    item.title = parts[1];
                    item.subtitle = parts[0];
                }
            }
        }

        if (!item.title) {
            item.title = doc['datum_str'];
        }
        if (!item.subtitle) {
            item.subtitle = doc['dc.title'];
        }
        if (item.doctype === 'supplement') {
            if (item.subtitle && item.subtitle.indexOf('.')) {
                item.subtitle = item.subtitle.substring(item.subtitle.indexOf('.') + 1);
          } else {
                item.subtitle = '';
          }
    }


        return item;
    }

    periodicalItems(solr, doctype: string, uuid: string = null): PeriodicalItem[] {
        let hasVirtualIssue = false;
        let virtualIssuePublic: boolean;
        const items: PeriodicalItem[] = [];
        for (const doc of solr['response']['docs']) {
            if (doc['fedora.model'] === 'page') {
                hasVirtualIssue = true;
                virtualIssuePublic = doc['dostupnost'] === 'public';
                continue;
            }
            items.push(this.periodicalItem(doc));
        }
        if (hasVirtualIssue) {
            const item = new PeriodicalItem();
            item.uuid = uuid;
            item.public = virtualIssuePublic;
            item.doctype = doctype;
            item.virtual = true;
            items.push(item);
        }
        return items;
    }


    periodicalFtItems(solr, query: string): PeriodicalFtItem[] {
        const items: PeriodicalFtItem[] = [];
        for (const doc of solr['response']['docs']) {
            const item = new PeriodicalFtItem();
            item.uuid = doc['PID'];
            item.public = doc['dostupnost'] === 'public';
            if (doc['fedora.model'] === 'article') {
                item.type = 'article';
                item.authors = doc['dc.creator'];
                item.title = doc['dc.title'];
            } else if (doc['fedora.model'] === 'monographunit') {
                item.type = 'monograph_unit';
                const pItem = this.periodicalItem(doc);
                item.title = pItem.title;
                item.part = pItem.subtitle;
            } else {
                item.type = 'page';
                item.page = doc['dc.title'];
                item.query = query;
            }
            if (doc['pid_path'].length > 0 && doc['model_path'].length > 0) {
                const pp = doc['pid_path'][0].replace(/\@/, '/');
                const pidPath = pp.split('/');
                const modelPath = doc['model_path'][0].split('/');
                for (let i = 0; i < modelPath.length; i++) {
                    const model = modelPath[i];
                    item.context[model] = pidPath[i];
                }
                // if (pidPath.length > 1) {
                //     item.issueUuid = pidPath[pidPath.length - 2];
                // }
                // if (pidPath.length > 2) {
                //     item.volumeUuid = pidPath[pidPath.length - 3];
                // }
                const uuid = item.uuid.replace(/\@/, '/@');
                if (solr['highlighting'][uuid]) {
                    const ocr = solr['highlighting'][uuid]['text'];
                    if (ocr) {
                        item.text = ocr[0];
                    }
                }
            }
            items.push(item);
        }

        return items;
    }


    numberOfResults(solr): number {
        return solr['response']['numFound'];
    }

    numberOfFacets(solr): number {
        if (solr['facets']) {
            return solr['facets']['x'];
        }
        return 100;
    }

    uuidList(solr): string[] {
        const list = [];
        for (const doc of solr['response']['docs']) {
            list.push(doc['PID']);
        }
        return list;
    }

    documentItems(solr): DocumentItem[] {
        const items: DocumentItem[] = [];
        for (const doc of solr['response']['docs']) {
            const item = new DocumentItem();
            item.title = doc['dc.title'];
            if (item.title === 'null') {
                item.title = '-';
            }
            item.uuid = doc['PID'];
            item.public = doc['dostupnost'] === 'public';
            item.doctype = doc['fedora.model'];
            item.date = doc['datum_str'];
            item.authors = doc['dc.creator'];
            item.resolveUrl(this.appSettings.getPathPrefix());
            items.push(item);
        }
        return items;
    }


    numberOfSearchResults(solr): number {
        return solr['grouped']['root_pid']['ngroups'];
    }

    searchResultItems(solr, query: SearchQuery): DocumentItem[] {
        const items: DocumentItem[] = [];
        for (const group of solr['grouped']['root_pid']['groups']) {
            const doclist = group['doclist'];
            const doc = doclist['docs'][0];
            const item = new DocumentItem();
            item.uuid = doc['root_pid'];
            item.public = doc['dostupnost'] === 'public';
            const dp = doc['model_path'][0];
            const params = {};
            item.title = doc['dc.title'];
            if (dp.indexOf('/') > 0) {
                item.title = doc['root_title'];
                item.doctype = dp.substring(0, dp.indexOf('/'));
                params['fulltext'] = query.getRawQ();
                item.hits = doclist['numFound'];
            } else {
                item.doctype = dp;
            }
            if (item.title === 'null') {
                item.title = '-';
            }
            if (item.doctype === 'periodical') {
                if (query.accessibility !== 'all') {
                    params['accessibility'] = query.accessibility;
                }
                if (query.isYearRangeSet()) {
                    params['from'] = query.from;
                    params['to'] = query.to;
                }
            }
            item.date = doc['datum_str'];
            item.authors = doc['dc.creator'];
            item.resolveUrl(this.appSettings.getPathPrefix());
            item.params = params;
            items.push(item);
        }
        return items;
    }

    facetList(solr, field, usedFiltes: any[], skipSelected: boolean) {
        const list = [];
        const facetFields = solr['facet_counts']['facet_fields'][field];
        if (!facetFields) {
            return list;
        }
        for (let i = 0; i < facetFields.length; i += 2) {
            let value = facetFields[i];
            if (!value) {
                continue;
            }
            if (SearchQuery.getSolrField('locations') === field) {
                value = value.toUpperCase();
                if (!/^[A-Z]{3}[0-9]{3}$/.test(value)) {
                    continue;
                }
            }
            const count = facetFields[i + 1];
            const selected = usedFiltes && usedFiltes.indexOf(value) >= 0;
            if (!selected) {
                list.push({'value' : value, 'count': count, 'selected': false});
            } else if (!skipSelected) {
                list.push({'value' : value, 'count': count, 'selected': true});
            }
        }
        return list;
    }

    facetDoctypeList(solr, joinedDocytypes: boolean, doctypes: string[]) {
        const map = {};
        for (const doctype of doctypes) {
            map[doctype] = 0;
        }
        const list = [];
        const facetFields = solr['facet_counts']['facet_fields']['model_path'];
        for (let i = 0; i < facetFields.length; i += 2) {
            const f = facetFields[i];
            if (f.indexOf('/') < 0) {
                if (map[f] !== undefined) {
                    map[f] += facetFields[i + 1];
                }
            } else if (!joinedDocytypes) {
                const ff = f.split('/')[0];
                if (map[ff] !== undefined) {
                    map[ff] += facetFields[i + 1];
                }
            }
        }
        for (const doctype of doctypes) {
            list.push({'value' : doctype, 'count': map[doctype]});
        }
        return list;
    }

    facetAccessibilityList(solr) {
        const list = [];
        let allDocs = 0;
        let libraryDocs = 0;
        let payingDocs = 0;
        let publicDocs = 0;
        const facetFields = solr['facet_counts']['facet_fields']['dostupnost'];
        for (let i = 0; i < facetFields.length; i += 2) {
            if (facetFields[i] === 'public') {
                publicDocs = facetFields[i + 1];
            } else if (facetFields[i] === 'only_in_library') {
              libraryDocs = facetFields[i + 1];
            } else if (facetFields[i] === 'paying_users') {
              payingDocs = facetFields[i + 1];
            }
            allDocs += facetFields[i + 1];
        }
        list.push({'value' : 'public', 'count': publicDocs});
        list.push({'value' : 'only_in_library', 'count': libraryDocs});
        list.push({'value' : 'paying_users', 'count': payingDocs});
        list.push({'value' : 'all', 'count': allDocs});
        return list;
    }

    browseFacetList(solr, field) {
        const list = [];
        const facetFields = solr['facet_counts']['facet_fields'][field];
        for (let i = 0; i < facetFields.length; i += 2) {
            const value = facetFields[i];
            const count = facetFields[i + 1];
            const item = {'value' : value, 'count': count, name: value};
            if (field === 'language' || field === 'fedora.model' || field === 'collection') {
                item['name'] = '';
            }
            list.push(item);
        }
        return list;
    }


}
