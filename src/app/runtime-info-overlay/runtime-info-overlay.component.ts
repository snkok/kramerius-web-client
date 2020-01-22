import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RuntimeInfo} from "../model/runtime-info";
import {AppConfigurationService} from "../services/app-configuration.service";
import {feVersionInfo} from "../fe-version-info";


@Component({
    selector: 'app-runtime-info-overlay',
    templateUrl: './runtime-info-overlay.component.html',
    styleUrls: ['./runtime-info-overlay.component.scss'],

})
export class RuntimeInfoOverlayComponent implements OnInit {

    visible: boolean = false;
    runtimeInfo: RuntimeInfo;
    feVersion = feVersionInfo;

    constructor(public appConfigurationService: AppConfigurationService) {
    }

    ngOnInit() {
        this.appConfigurationService.getRuntimInfo().subscribe(value => {
            this.runtimeInfo = value;
            this.visible = this.runtimeInfo.visible;
        });
    }

    close() {
        this.visible = false;
    }

}
