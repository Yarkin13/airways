import { TestBed } from '@angular/core/testing';

import { InterceptorUrlService } from './interceptor-url.service';

describe('InterceptorUrlService', () => {
  let service: InterceptorUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
