import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = "https://portfolio-lucas24865.koyeb.app/api/auth/check";
  currentUserSubjet: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubjet = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    if(sessionStorage.getItem('currentUser'))
    {
      PortfolioService.permission.admin = true;
    }
  }
  Login(credentials: any): Observable<any> {
    return this.http.post(this.url, credentials).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubjet.next(data);
      PortfolioService.permission.admin = true;
      return data;
    }))
  }
  Logout() {
    sessionStorage.setItem('currentUser', "");
    PortfolioService.permission.admin = false;
  }

  get UserAuthenticate() {
    return this.currentUserSubjet.value;
  }
}
