import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
declare var $:any;
import { Observable, throwError } from 'rxjs';
import { map, catchError, window } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public router: Router, public toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    const anonymousToken: string = localStorage.getItem('anonymousToken');
    if (request.url.indexOf('s3-accelerate.amazonaws.com') !== -1) {

    }
    else {
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      } else {
        if (anonymousToken) {
          if (request.url.indexOf('/auth/local') !== -1) {
            localStorage.clear();
          } else {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + anonymousToken) });
          }
        }
      }

      // if (anonymousToken) {
      //   request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + anonymousToken) });
      // }
    }

    //   if (!request.headers.has('Content-Type')) {
    //       request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    //   }

    //request = request.clone({ headers: request.headers.set('Accept', undefined) });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
        };


        if (error.status == 401) {
          this.toastr.error('Unauthorized!');
          localStorage.clear();
          this.router.navigate(['login'])
        }
        // else if(error.status == 0)
        // {
        //   this.toastr.info('No Internet Available, Please retry again!');
        // }
        else {
          console.clear() 
          if (!!error.error.message) {
            if(!!localStorage.getItem('tempToken'))
            {
              localStorage.removeItem('tempToken')
              
            }
            else{
              if (request.url.indexOf('users/setcontributor') !== -1 || request.url.indexOf('users/getCommonItem') !== -1) {
              } else {
                this.toastr.error(error.error.message);
              }
            }
            
          }
          else {
            if(!!localStorage.getItem('tempToken'))
            {
              localStorage.removeItem('tempToken')
              
            }
            else{
              this.toastr.error(error.error.message);
            }
            
          }


        }
        return throwError(error);

      })
    )
  }
}