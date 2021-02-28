/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router, UrlSerializer} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'mdc-top-app-bar-demo',
  templateUrl: 'mdc-top-app-bar-demo.html',
  styleUrls: ['mdc-top-app-bar-demo.css'],
})
export class MdcTopAppBarDemo {
    unsafeQueryString = `${this._document.location.origin}/static/mdc-top-app-bar-example`;
    queryString: SafeResourceUrl =
        this._sanitizer.bypassSecurityTrustResourceUrl(this.unsafeQueryString);
    short: boolean = false;
    collapsed: boolean = false;

    @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>;

    constructor(private _router: Router,
                private _serializer: UrlSerializer,
                private _sanitizer: DomSanitizer,
                @Inject(DOCUMENT) private _document: Document) {
    }

    postMessage(scope: string, val: boolean) {
        this.iframe.nativeElement.contentWindow!
            .postMessage(`${scope}:${val}`, this.unsafeQueryString);
    }

    updateShort(checked: boolean) {
        if (!checked && this.collapsed) {
            this.collapsed = false;
            this.postMessage('collapsed', false);
        }

        this.postMessage('short', checked);
    }
}
