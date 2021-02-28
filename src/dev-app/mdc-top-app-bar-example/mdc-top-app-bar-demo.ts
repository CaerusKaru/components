/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, HostListener, Inject, ViewEncapsulation} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'mdc-top-app-bar-demo',
  templateUrl: 'mdc-top-app-bar-demo.html',
  styleUrls: ['mdc-top-app-bar-demo.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MdcTopAppBarDemo {
    readonly darkThemeClass = 'demo-unicorn-dark-theme';
    short = false;
    dense = false;
    adjust = false;
    fixed = false;
    prominent = false;
    collapsed = false;

    constructor(@Inject(DOCUMENT) private _document: Document) {
    }

    // tslint:disable-next-line:no-host-decorator-in-concrete
    @HostListener('window:message', ['$event'])
    parseMessage(event: MessageEvent) {
        if (event.origin !== 'http://localhost:4200') {
            return;
        }

        const [scope, val] = event.data.split(':');
        const boolVal = coerceBooleanProperty(val);
        switch (scope) {
            case 'dense':
                this.dense = boolVal;
                break;
            case 'short':
                this.short = boolVal;
                break;
            case 'adjust':
                this.adjust = boolVal;
                break;
            case 'fixed':
                this.fixed = boolVal;
                break;
            case 'collapsed':
                this.collapsed = boolVal;
                break;
            case 'prominent':
                this.prominent = boolVal;
                break;
        }
    }

    updateThemeClass(isDark?: boolean) {
        if (isDark) {
            this._document.body.classList.add(this.darkThemeClass);
        } else {
            this._document.body.classList.remove(this.darkThemeClass);
        }
    }
}
