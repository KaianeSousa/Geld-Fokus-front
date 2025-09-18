import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {
   HttpErrorResponse,
   HttpEvent,
   HttpHandlerFn,
   HttpInterceptorFn,
   HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
   request: HttpRequest<unknown>,
   next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
   const router = inject(Router);
   const token = localStorage.getItem('token');
   const apiBaseUrl = 'http://localhost:8080';
   const isApiRoute = request.url.startsWith(apiBaseUrl);
   const isPublicRoute = request.url.includes('/auth/login') || request.url.includes('/auth/register');

   let processedRequest = request;

   if (token && isApiRoute && !isPublicRoute) {
      processedRequest = request.clone({
         setHeaders: {
            Authorization: `Bearer ${token}`,
         },
      });
   }

   return next(processedRequest).pipe(
      catchError((error: Error) => {
         if (error instanceof HttpErrorResponse && error.status === 401) {
            localStorage.removeItem('token');
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            router.navigate(['/login']).then(() => {
               window.location.reload();
            });
         }
         return throwError(() => error);
      })
   );
};
