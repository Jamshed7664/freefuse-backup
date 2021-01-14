import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, window } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const adminToken: string = localStorage.getItem('adminToken');

            if (adminToken) {
//                 if(request.url.indexOf('/admin/users') !== -1) {

//                 } else {
                    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + adminToken) });
//                 }
            }
        

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data: any = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                if (error.status == 401 || error.status == 404) {
                    // this.toastr.error('Unauthorized!');
                    localStorage.clear();
                    this.router.navigate(['login'])
                } else {
                    if(!!error.error.message) {
                        //this.toastr.error(error.error.message);
                    } else {
                        //this.toastr.error(error.error.data);
                    }
                }
                return throwError(error);
            })
        )
    }
}
