import { TestBed } from '@angular/core/testing';

import { BillGeneratorService } from './bill-generator.service';

describe('BillGeneratorService', () => {
  let service: BillGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
