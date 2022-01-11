import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { AccountBalanceDto, AliasDto } from '../types';

const SLOW_MS = 30000;
const FAST_MS = 15000;

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(private readonly _http: HttpClient) {}

    monkey(address: string): Promise<string> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this._http
            .get(`https://monkey.banano.cc/api/v1/monkey/${address}`, { headers, responseType: 'text' })
            .pipe(timeout(FAST_MS))
            .toPromise<string>();
    }

    getAccountBalances(): Promise<AccountBalanceDto[]> {
        return this._http
            .post<AccountBalanceDto[]>('https://api.spyglass.pw/banano/v1/distribution/rich-list',
                { offset: 0, size: 50 })
            .pipe(timeout(SLOW_MS))
            .toPromise();
    }

    getAliases(): Promise<AliasDto[]> {
        return this._http.post<AliasDto[]>(`https://api.spyglass.pw/banano/v1/known/accounts`, undefined)
            .pipe(timeout(FAST_MS)).toPromise();
    }
}
