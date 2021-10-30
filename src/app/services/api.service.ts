import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { timeout } from 'rxjs/operators';
import { AccountBalanceDto, AliasDto, PriceDataDto } from '../types';

const SLOW_MS = 30000;
const FAST_MS = 15000;

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    url = environment.api;
    richListUrl = environment.richListApi;

    constructor(private readonly _http: HttpClient) {}

    monkey(address: string): Promise<string> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this._http
            .get(`https://monkey.banano.cc/api/v1/monkey/${address}`, { headers, responseType: 'text' })
            .pipe(timeout(FAST_MS))
            .toPromise<string>();
    }

    getAccountBalances(offset: number, pageSize: number): Promise<AccountBalanceDto[]> {
        return this._http
            .get<AccountBalanceDto[]>(`${this.richListUrl}/accounts-balance?offset=${offset}&size=${pageSize}`)
            .pipe(timeout(SLOW_MS))
            .toPromise();
    }

    getAliases(): Promise<AliasDto[]> {
        return this._http.get<AliasDto[]>(`${this.url}/aliases`).pipe(timeout(FAST_MS)).toPromise();
    }
}
