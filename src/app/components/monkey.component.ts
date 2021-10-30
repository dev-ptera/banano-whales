import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ViewportService } from '../services/viewport.service';

@Component({
    selector: 'app-monkey',
    template: `
        <div
            [style.padding.px]='vp.sm ? 16 : 48'
            [style.paddingTop.px]='0'
            style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 100px;"

        >
            <div
                *ngIf="monkeySvg"
                class="account-monkey"
                [innerHTML]="monkeySvg | safe"
                [style.width.px]="getSize()"
            ></div>
            <img
                *ngIf="!monkeySvg"
                class="account-monkey"
                src="../../assets/placeholder-monkey.svg"
                [style.width.px]="getSize()"
            />
            <div [class.mat-h2]='!vp.sm' [class.mat-h3]='vp.sm'

                class="link" style="font-weight: 600; margin-bottom: 0" (click)="openSpyglass()">
                {{ alias || address.substr(0, 11) + '...' }}
            </div>
            <div [class.mat-h1]='!vp.sm' [class.mat-h3]='vp.sm'  >{{ ban | number: '1.0':'en-US' }} BAN</div>
            <!-- <div class="mat-h4">#{{rank}}</div> -->
        </div>
    `,
})
export class MonkeyComponent {
    @Input() ban: number;
    @Input() address: string;
    @Input() alias: string;
    @Input() rank: number;

    monkeySvg: string;
    loadMonkey = true;

    constructor(public vp: ViewportService, private readonly _api: ApiService) {}

    ngOnInit(): void {
        this.ban = Math.round(this.ban);

        if (!this.loadMonkey) {
            return;
        }

        this._api
            .monkey(this.address)
            .then((data) => {
                this.monkeySvg = data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getSize(): number {
        if (this.ban > 100_000_000) {
            return this.vp.sm ? 300 : 450;
        }
        if (this.ban > 50_000_000) {
            return this.vp.sm ? 250 : 350;
        }
        if (this.ban > 25_000_000) {
            return this.vp.sm ? 200 : 325;
        }
        if (this.ban > 15_000_000) {
            return this.vp.sm ? 175 : 275;
        }
        if (this.ban > 10_000_000) {
            return this.vp.sm ? 150 : 215;
        }
        if (this.ban > 5_000_000) {
            return this.vp.sm ? 100 : 175;
        }
        if (this.ban > 3_000_000) {
            return this.vp.sm ? 80 :  150;
        }
        return this.vp.sm ? 50 : 100;
    }

    openSpyglass(): void {
        window.open(`https://www.yellowspyglass.com/account/${this.address}`, '_blank').focus();
    }
}
