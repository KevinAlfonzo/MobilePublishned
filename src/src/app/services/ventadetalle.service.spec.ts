import { TestBed } from '@angular/core/testing';

import { VentadetalleService } from './ventadetalle.service';

describe('VentadetalleService', () => {
  let service: VentadetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentadetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
