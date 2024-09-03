import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFacturaComponent } from './show-factura.component';

describe('ShowFacturaComponent', () => {
  let component: ShowFacturaComponent;
  let fixture: ComponentFixture<ShowFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
