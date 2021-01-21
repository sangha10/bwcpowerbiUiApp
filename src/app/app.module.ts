import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component'; 
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportService } from './Services/report.service'; 
import { environment } from './../environments/environment';
//import { NgxSpinnerModule } from "ngx-spinner";  

const routes: Routes = [
  { path: 'report', component: ReportComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] }, 
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,   
    RouterModule.forRoot(routes),
    //RouterModule.forRoot(routes, {useHash: true}),
    MsAdalAngular6Module.forRoot(getAdalConfig)//,
    //NgxSpinnerModule
  ],
  providers: [AuthenticationGuard, ReportService 
  ],
  bootstrap: [AppComponent]//,
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

export function getAdalConfig() {
  return {
    tenant: environment.adalConfig.tenant,
    clientId: environment.adalConfig.clientId,
    cacheLocation: environment.adalConfig.cacheLocation,
    endpoints: { "api": environment.adalConfig.endPoint },
    navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl,
    redirectUri: environment.adalConfig.redirectUri,
    expireOffsetSeconds: environment.adalConfig.expireOffsetSeconds
  };
}
