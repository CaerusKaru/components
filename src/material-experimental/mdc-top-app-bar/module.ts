/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {MatCommonModule} from '@angular/material-experimental/mdc-core';
import {
  MatTopAppBar,
  MatTopAppBarRow,
  MatTopAppBarSection,
  MatTopAppBarTitle,
  MatTopAppBarButton,
} from './top-app-bar';

@NgModule({
  imports: [MatCommonModule],
  declarations: [
    MatTopAppBar,
    MatTopAppBarRow,
    MatTopAppBarSection,
    MatTopAppBarTitle,
    MatTopAppBarButton,
  ],
  exports: [
    MatCommonModule,
    MatTopAppBar,
    MatTopAppBarRow,
    MatTopAppBarSection,
    MatTopAppBarTitle,
    MatTopAppBarButton,
  ],
})
export class MatTopAppBarModule {
}
