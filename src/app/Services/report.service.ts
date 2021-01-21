import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'; 
import { Response, TokenResponse } from '../Models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url: string = environment.apiUrl;
  headers: any;
  constructor(private http: HttpClient) {
  }

  getValidationToken(username):Observable<TokenResponse> 
  {
    var body = { 'AppSecret' : environment.secretKey , 'UserEmail' : username };
    var url =  environment.apiUrl + environment.actionToken;
    var res = this.http.post<TokenResponse>(url, body);     
    return res;
  }
 
  getTokenAndUrl(accessToken, reportId, username, roleName, workspaceId):  Observable<Response> 
  {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', 'Bearer ' + accessToken); 
    this.url = environment.apiUrl + environment.actionName; 
    var body = { 'reportId': reportId, 'userName': username, 'roleName': roleName, 'workspaceId': workspaceId };
    var res = this.http.post<Response>(this.url, body, { headers: this.headers });     
    return res;
  } 
}
