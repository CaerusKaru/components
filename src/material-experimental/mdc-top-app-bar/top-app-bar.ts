/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, ContentChild, ContentChildren,
    Directive,
    ElementRef, Inject,
    Input,
    OnChanges, QueryList, ViewChild, ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {DOCUMENT} from '@angular/common';

/** Possible section alignment values. */
export type Align = 'start' | 'end' | undefined;

@Directive({
    selector: '[matTopAppBarTitle]',
    exportAs: 'matTopAppBarTitle',
    host: {'class': 'mdc-top-app-bar__title'},
})
export class MatTopAppBarTitle {}

@Directive({
    selector: 'button[mat-icon-button] [matTopAppBarButton]',
    exportAs: 'matTopAppBarSection',
    host: {
        '[class.mdc-top-app-bar__navigation-icon]': 'navigation',
        '[class.mdc-top-app-bar__action-item]': '!navigation',
    },
})
export class MatTopAppBarButton {
    @Input() navigation: boolean = false;
}

@Directive({
    selector: 'mat-top-app-bar-row > section',
    exportAs: 'matTopAppBarSection',
    host: {
        'class': 'mdc-top-app-bar__section',
        '[class.mdc-top-app-bar__section--align-start]': 'align === "start"',
        '[class.mdc-top-app-bar__section--align-end]': 'align === "end"',
    },
})
export class MatTopAppBarSection {
    @Input() align: Align;
}

@Directive({
    selector: 'mat-top-app-bar-row',
    exportAs: 'matTopAppBarRow',
    host: {'class': 'mdc-top-app-bar__row'},
})
export class MatTopAppBarRow {}

/**
 * @see https://material.io/components/app-bars-top
 */
@Component({
    selector: 'header[matTopAppBar]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['top-app-bar.css'],
    exportAs: 'matTopAppBar',
    host: {
        'class': 'mdc-top-app-bar mat-mdc-top-app-bar',
        '[class.mdc-top-app-bar--fixed]': 'fixed',
        '[class.mdc-top-app-bar--prominent]': 'prominent',
        '[class.mdc-top-app-bar--dense]': 'dense',
        '[class.mdc-top-app-bar--short]': 'short',
        '[class.mdc-top-app-bar--short-has-action-item]': 'hasActionItems',
        '[class.mdc-top-app-bar--short-collapsed]': 'collapsed || scrollCollapsed',
        '(window:scroll)': 'short && !collapsed && onScroll()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatTopAppBar implements AfterContentInit, OnChanges {
    /**
     * Whether the top app bar will always be collapsed.
     */
    @Input()
    get collapsed(): boolean {
        return this._collapsed;
    }
    set collapsed(val: boolean) {
        const valBoolean = coerceBooleanProperty(val);
        if (!this.short && valBoolean) {
            console.warn('Cannot set top-app-bar collapsed if not in short mode.');
        }

        this._collapsed = valBoolean;
    }
    private _collapsed: boolean = false;

    /**
     * Whether the top app bar will be fixed.
     */
    @Input() fixed: boolean = false;

    /**
     * Whether the top app bar will be shown prominently.
     */
    @Input() prominent: boolean = false;

    /**
     * Whether the top app bar will be dense.
     */
    @Input() dense: boolean = false;

    /**
     * Whether the top app bar will be short.
     */
    /**
     * Whether the top app bar will always be collapsed.
     */
    @Input()
    get short(): boolean {
        return this._short;
    }
    set short(val: boolean) {
        const valBoolean = coerceBooleanProperty(val);
        if (this.collapsed && !valBoolean) {
            console.warn('Cannot set top-app-bar collapsed if not in short mode.');
        }

        this._scrollCollapsed = valBoolean ? this._shouldScrollCollapse() : false;
        this._short = valBoolean;
    }
    private _short: boolean = false;

    /**
     * Whether to add an offset to the adjacent element. Not needed if fixed is set.
     */
    @Input() adjust: boolean;

    get scrollCollapsed(): boolean {
        return this._scrollCollapsed;
    }
    private _scrollCollapsed = false;

    get hasActionItems(): boolean {
        return this._hasActionItems;
    }
    private _hasActionItems = false;

    @ContentChildren(MatTopAppBarButton, {descendants: true})
    private _buttons: QueryList<MatTopAppBarButton>;

    private _adjustClass = '';

    constructor(@Inject(DOCUMENT) private _doc: Document,
                private _elementRef: ElementRef<HTMLElement>) {
    }

    ngAfterContentInit() {
        this._hasActionItems = this._buttons.find(b => b.navigation) !== undefined;
    }

    ngOnChanges() {
        this._setAdjustClass();
    }

    onScroll() {
        this._scrollCollapsed = this._shouldScrollCollapse();
    }

    private _shouldScrollCollapse() {
        const currentScroll = this._doc.defaultView!.pageYOffset;
        return currentScroll > 0;
    }

    private _setAdjustClass() {
        const sibling = this._elementRef.nativeElement.nextElementSibling;

        if (!sibling) {
            return;
        }

        const oldAdjustClass = this._adjustClass;
        const newAdjustClass = this._getAdjustClass();

        if (oldAdjustClass === newAdjustClass) {
            return;
        }

        if (newAdjustClass) {
            // NOTE for IE11: does not support multiple arguments
            sibling.classList.add(newAdjustClass);
        }

        if (oldAdjustClass) {
            // NOTE for IE11: does not support multiple arguments
            sibling.classList.remove(oldAdjustClass);
        }

        this._adjustClass = newAdjustClass;
    }

    private _getAdjustClass() {
        if (this.fixed || this.adjust) {
            if (this.dense) {
                return this.prominent ?
                    'mdc-top-app-bar--prominent-fixed-adjust' :
                    'mdc-top-app-bar--dense-fixed-adjust';
            }

            if (this.prominent) {
                return 'mdc-top-app-bar--prominent-fixed-adjust';
            }

            if (this.short) {
                return 'mdc-top-app-bar--short-fixed-adjust';
            }

            return 'mdc-top-app-bar--fixed-adjust';
        }

        return '';
    }
}
