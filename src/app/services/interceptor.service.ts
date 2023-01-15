import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authenticationService:AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>>{
    var currentUser = this.authenticationService.UserAuthenticate
    if(currentUser && currentUser.token)
    {
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer `+ currentUser.token          
        }
      })
    }
    console.log(currentUser);
    return next.handle(req);
  }
  
}
