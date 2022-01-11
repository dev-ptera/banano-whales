import { Component } from '@angular/core';
import * as Colors from '@pxblue/colors';
import { AccountBalanceDto } from './types';
import { ViewportService } from './services/viewport.service';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    colors = Colors;

    whales: AccountBalanceDto[] = [];
    loading: boolean;
    error: boolean;
    aliasMap: Map<string, string> = new Map<string, string>();

    supply = 1_900_000_000;

    constructor(public vp: ViewportService, private readonly _api: ApiService) {}

    ngOnInit(): void {
        this._api.getAccountBalances()
            .then((whales) => {
                this.whales = whales;
                this.loading = false;
            })
            .catch((err) => {
                this.error = true;
                console.error(err);
            });

        void this._api
            .getAliases()
            .then((data) => {
                for (const entry of data) {
                    this.aliasMap.set(entry.address, entry.alias);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getAlias(addr: string): string {
        return this.aliasMap.get(addr);
    }
}
