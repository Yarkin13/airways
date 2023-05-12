import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/shared/constants';

@Injectable()
export class InterceptorUrlService implements HttpInterceptor {
  /* eslint-disable-next-line */
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const URL = `${baseUrl}${req.url}`;

    const newReq = req.clone({
      url: URL,
    });

    return next.handle(newReq);
  }
}
