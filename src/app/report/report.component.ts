import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MsAdalAngular6Module, MsAdalAngular6Service } from 'microsoft-adal-angular6';
import * as pbi from 'powerbi-client';
import { Response, TokenResponse } from '../Models/response.model';
import { ReportService } from '../Services/report.service';
import { environment } from './../../environments/environment';
//import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  showsuccess: boolean = false;
  showFail: boolean = false;
  showLogoutButton: boolean = false;

  report: pbi.Embed;
  public screenHeight: number;
  @ViewChild('reportContainer') reportContainer: ElementRef;
  constructor(private reportService: ReportService, private msAdal: MsAdalAngular6Service, private router: Router 
    //private spinner: NgxSpinnerService
  ) {
  }

  //Initilize all properties on Init
  ngOnInit() {
    //this.spinner.show();
    this.showLogoutButton = false
    this.showsuccess = false;
    this.showFail = false;
    this.screenHeight = (window.screen.height);
    const resource = environment.powerBiUrl;

    //Fetch token from Adal
    this.msAdal.acquireToken(resource).subscribe((resToken: string) => 
    {
      if(resToken!=null)
      {
        this.GetValidationToken();
      }
    }, (error) => 
    {
      console.log('Error in Fetching Validation Token:' +error);
      this.showFail = true;
    });
  }

  async GetValidationToken()
  {
    var username = this.msAdal.userInfo.userName;
    await this.reportService.getValidationToken(username).subscribe((result: TokenResponse) => { 
    //Fetch Token from API
    if(result && result.token) 
    {
        this.fetchToken(result.token, username); 
    }
    else
    {
      this.showFail = true; 
    }
  }, (error) => {
    this.showFail = true;
    //this.spinner.hide();
    console.log('Error in fetching Token from API: ' + error)
  });
  }
  //Fetch Token from API
  async fetchToken(resToken, username) { 
    var workspaceId = environment.workspaceId;
    //Get Token, Embedded URL from API
    await this.reportService.getTokenAndUrl(resToken, environment.reportId, username, environment.roleName, workspaceId).subscribe((result: Response) => {
     
      if(result && result.embedToken && result.embedUrl){
      var token = result.embedToken;
      var url = result.embedUrl;
      //On Success Show Report
      this.showReport(token, url);}
      else{ this.showFail = true;}
    }, (error) => {
      this.showFail = true;
      //this.spinner.hide();
      console.log('Error in fetching Token from API: ' + error)
    });
  }

  //Show Report on UI after getting token from API
  showReport(Token, embeddedURL) {
    let embedUrl = embeddedURL;
    let embedReportId = environment.reportId;
    let settings: pbi.IEmbedSettings = {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
    };
    let config: pbi.IEmbedConfiguration = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: Token,
      embedUrl: embedUrl,
      id: embedReportId,
      permissions: pbi.models.Permissions.All,
      viewMode: pbi.models.ViewMode.View,
      pageView: "fitToWidth",
      filters: [],
      settings: {
        panes: {
          filters: {
            visible: true
          },
          pageNavigation: {
            visible: true
          }
        }
      }
    };
    let reportContainer = this.reportContainer.nativeElement;
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    this.report = powerbi.embed(reportContainer, config);


    // Report.off removes a given event handler if it exists.
    this.report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    this.report.on("loaded", () => {
      this.showsuccess = true;
      console.log("Loaded");
      //this.spinner.hide();
    });

    this.report.on("error", (err) => {
      this.showFail = true;
      //this.spinner.hide();
      console.log("Error in Fetching Report " + err);
    });
  }

  //Logout on Logout Button click
  logout() {
    this.msAdal.logout();
    this.showLogoutButton = false
    this.showsuccess = false;
    this.showFail = false;
    this.router.navigate(['/home']);
  }
}
