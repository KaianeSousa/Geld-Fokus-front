import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authInitialized().pipe(
    map(() => {
      if (authService.isLogged()) {
        return true;
      }

      return router.createUrlTree(['/']);
    })
  );
};