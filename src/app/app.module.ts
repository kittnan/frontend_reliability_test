import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './pages/footer/footer.component';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig
} from "ngx-ui-loader";
import { HttpClientModule } from '@angular/common/http';
import { QeWindowPersonComponent } from './pages/qe-window-person/qe-window-person.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig ={
  "bgsColor": "#673ab7",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#673ab7",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "cube-grid",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(145,145,145,0.8)",
  "pbColor": "#000000",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    FooterComponent,
    QeWindowPersonComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
