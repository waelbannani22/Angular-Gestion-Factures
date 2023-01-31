import { TestBed } from '@angular/core/testing';

import { ServicescustomvalidationService } from './servicescustomvalidation.service';

describe('ServicescustomvalidationService', () => {
  let service: ServicescustomvalidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicescustomvalidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
