import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmptyStateModule } from '@pxblue/angular-components';
import { SafeHtmlPipe } from './pipes/safe.pipe';
import { MonkeyComponent } from './components/monkey.component';
import { ResponsiveDirective } from './directive/responsive.directive';

@NgModule({
    declarations: [AppComponent, SafeHtmlPipe, MonkeyComponent, ResponsiveDirective],
    imports: [
        BrowserModule,
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatDividerModule,
        MatToolbarModule,
        MatIconModule,
        EmptyStateModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
