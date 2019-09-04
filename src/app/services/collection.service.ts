import { Collection } from './../model/collection.model';
import { Translator } from 'angular-translator';
import { Injectable } from '@angular/core';

@Injectable()
export class CollectionService {

    public collections: Collection[];
    private cache = {};

    constructor(private translator: Translator) {
        this.translator.languageChanged.subscribe(() => {
            this.localeChanged();
        });
    }

    public clear() {
        this.collections = null;
        this.cache = {};
    }

    getNameByPid(pid: string): string {
        return this.cache[pid] ? this.cache[pid].title : '-';
    }

    getDescriptionByPid(pid: string): string {
        return this.cache[pid] ? this.cache[pid].description : '-';
    }

    assign(collections) {
        if (collections) {
            this.collections = [];
            for (const col of collections) {
                const collection = new Collection();
                collection.pid = col.pid;
                if (col.descs) {
                    collection.titleSk = col.descs.sk;
                    collection.titleEn = col.descs.en;
                }
                if (col.longDescs) {
                    collection.descriptionCs = col.longDescs.sk;
                    collection.descriptionEn = col.longDescs.en;
                }
                if (col.numberOfDocs) {
                    collection.count = col.numberOfDocs;
                }
                this.collections.push(collection);
                this.cache[collection.pid] = collection;
            }
            this.localeChanged();
        }
    }

    ready(): boolean {
        return !!this.collections;
    }


    private localeChanged() {
        if (!this.collections) {
            return;
        }
        for (const col of this.collections) {
            if (this.translator.language === 'sk') {
                col.title = col.titleSk;
                col.description = col.descriptionCs;
            } else {
                col.title = col.titleEn;
                col.description = col.descriptionEn;
            }
        }
    }

}
