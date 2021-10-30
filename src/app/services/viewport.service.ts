import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';

export type Breakpoint = 'sm' | 'md' | undefined;

// Use this service to get viewport size.
@Injectable({
    providedIn: 'root',
})
export class ViewportService {
    breakpoint: Breakpoint;
    breakpointSubscription: any;
    md: boolean;
    sm: boolean;

    vpChange = new Subject<Breakpoint>();

    // Viewports are treated as mutually exclusive; a viewpoint cannot be 'sm' and 'md' at the same time.
    constructor(private readonly _breakpointObserver: BreakpointObserver) {
        this.breakpointSubscription = this._breakpointObserver
            .observe(['(max-width: 1280px)', '(max-width: 750px)'])
            .subscribe((result) => {
                const md = Object.keys(result.breakpoints)[0];
                const sm = Object.keys(result.breakpoints)[1];
                this.sm = result.breakpoints[sm];
                this.md = result.breakpoints[md] && !this.sm;
                this.breakpoint = this.sm ? 'sm' : this.md ? 'md' : undefined;
                this.vpChange.next(this.breakpoint);
            });
    }

    isSmall(): boolean {
        return this.sm;
    }
}
