import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
url="https://portfolio-lucas24865.koyeb.app/api/auth/check";
currentUserSubjet: BehaviorSubject<any>;
  constructor(private http:HttpClient) { 
    console.log("Authentication Service Running");
    this.currentUserSubjet = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'));
  }
  Login(credentials:any):Observable<any>{
    return this.http.post(this.url,credentials).pipe(map(data =>{
      sessionStorage.setItem('currentUser',JSON.stringify(data));
      this.currentUserSubjet.next(data)
      return data;
    }))
  }

  get UserAuthenticate()
  {
    return this.currentUserSubjet.value;
  }
}
