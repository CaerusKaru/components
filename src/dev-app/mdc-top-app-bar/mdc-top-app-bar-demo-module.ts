/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MdcTopAppBarDemo} from './mdc-top-app-bar-demo';
import {MatTopAppBarModule} from '@angular/material-experimental/mdc-top-app-bar';
import {MatButtonModule} from '@angular/material-experimental/mdc-button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material-experimental/mdc-checkbox';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        MatTopAppBarModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        RouterModule.forChild([{path: '', component: MdcTopAppBarDemo}]),
        FormsModule,
    ],
  declarations: [MdcTopAppBarDemo],
})
export class MdcTopAppBarDemoModule {
}
