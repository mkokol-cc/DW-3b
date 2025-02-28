import { HttpInterceptorFn } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const sesionService = inject(SessionService)
  if (!req.url.includes('/login')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sesionService.getToken()}`
      }
    })
    console.log(req)
  }
  return next(req);
};
