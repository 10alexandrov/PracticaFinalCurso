import { TestBed } from '@angular/core/testing';

import { LugaresService } from './lugares.service';

describe('LugaresService', () => {
  let service: LugaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LugaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
