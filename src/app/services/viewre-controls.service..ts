import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

declare global {
    interface Document {
        msExitFullscreen: any;
        mozCancelFullScreen: any;
        mozFullScreenElement: any;
        msFullscreenElement: any;
    }

    interface Element {
        msRequestFullscreen(): void;
        mozRequestFullScreen(): void;
    }
}

@Injectable()
export class ViewerControlsService {

    private listners = new Subject<any>();

    public fullscreenAvailable = false;
    public leftPanelVisible = true;
    public rightPanelVisible = true;

    constructor() {
        this.fullscreenAvailable = document.fullscreenEnabled
                || document['webkitFullscreenEnable']
                || document['mozFullScreenEnabled']
                || document['msFullscreenEnabled'];

        // document.addEventListener('fullscreenchange', this.onFullscreenChanged);
        const ctx = this;
        document.addEventListener('fullscreenchange', () => ctx.onFullscreenChanged());
        document.addEventListener('webkitfullscreenchange', () => ctx.onFullscreenChanged());
        document.addEventListener('mozfullscreenchange', () => ctx.onFullscreenChanged());
        document.addEventListener('MSFullscreenChange', () => ctx.onFullscreenChanged());

        window.addEventListener('orientationchange', () => ctx.onOrientationChanged());
        window.addEventListener('resize', () => ctx.onOrientationChanged());
    }

    clear() {
        this.leftPanelVisible = true;
        this.rightPanelVisible = true;
    }

    viewerActions(): Observable<ViewerActions> {
        return this.listners.asObservable();
    }

    zoomIn() {
        this.listners.next(ViewerActions.zoomIn);
    }

    zoomOut() {
        this.listners.next(ViewerActions.zoomOut);
    }

    rotateRight() {
        this.listners.next(ViewerActions.rotateRight);
    }

    rotateLeft() {
        this.listners.next(ViewerActions.rotateLeft);
    }

    fitToScreen() {
        this.listners.next(ViewerActions.fitToScreen);
    }

    selectText() {
        this.listners.next(ViewerActions.selectText);
    }

    cropImage() {
        this.listners.next(ViewerActions.cropImage);
    }

    enterFullscreen() {
        const el = document.getElementById('app-viewer');
        // go full-screen
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el['webkitRequestFullscreen']) {
            el['webkitRequestFullscreen']();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document['webkitExitFullscreen']) {
            document['webkitExitFullscreen']();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    fullscreenEnabled() {
        return document['fullscreenElement']
        || document['webkitFullscreenElement']
        || document.mozFullScreenElement
        || document.msFullscreenElement;
    }

    onFullscreenChanged() {
        // console.log('onFullscreenchanged');
        this.fitToScreen();
        setTimeout(() => {
            this.fitToScreen();
        }, 200);
    }

    onOrientationChanged() {
        // console.log('onOrientationChanged');
        this.fitToScreen();
        setTimeout(() => {
            this.fitToScreen();
        }, 600);
    }

    hideLeftPanel() {
        this.leftPanelVisible = false;
        setTimeout(() => {
            this.fitToScreen();
        }, 600);
    }

    showLeftPanel() {
        this.leftPanelVisible = true;
        setTimeout(() => {
            this.fitToScreen();
        }, 600);
    }

    hideRightPanel() {
        this.rightPanelVisible = false;
        setTimeout(() => {
            this.fitToScreen();
        }, 600);
    }

    showRightPanel() {
        this.rightPanelVisible = true;
        setTimeout(() => {
            this.fitToScreen();
        }, 600);
    }


}


export enum ViewerActions {
    none = 0,
    zoomIn = 1,
    zoomOut = 2,
    rotateLeft = 3,
    rotateRight = 4,
    fitToScreen = 5,
    selectText = 6,
    cropImage = 7
}
