import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
   providers: [
      provideHttpClient(
         withInterceptors([authInterceptor])
      ),
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideAnimations(),
   ]
};
