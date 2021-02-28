/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directionality} from '@angular/cdk/bidi';
import {FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MAT_RIPPLE_GLOBAL_OPTIONS} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {DevAppComponent} from './dev-app';
import {DevAppDirectionality} from './dev-app/dev-app-directionality';
import {DevAppModule} from './dev-app/dev-app-module';
import {DevAppRippleOptions} from './dev-app/ripple-options';
import {DEV_APP_ROUTES} from './dev-app/routes';

@Component({
    selector: 'dev-iframe-container',
    template: `<router-outlet></router-outlet>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeContainer {
}

const DEV_APP_PARENT_ROUTES: Routes = [
    {
        path: 'static',
        component: IframeContainer,
        children: [
            {
                path: 'mdc-top-app-bar-example',
                // tslint:disable-next-line:max-line-length
                loadChildren: 'mdc-top-app-bar-example/mdc-top-app-bar-demo-module#MdcTopAppBarDemoModule',
            },
        ],
    },
    {path: '', component: DevAppComponent, children: DEV_APP_ROUTES},
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DevAppModule,
    HttpClientModule,
    RouterModule.forRoot(DEV_APP_PARENT_ROUTES),
  ],
  declarations: [
    IframeContainer,
    DevAppComponent,
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: DevAppRippleOptions},
    {provide: Directionality, useClass: DevAppDirectionality},
  ],
  bootstrap: [IframeContainer],
})
export class MainModule {
}
