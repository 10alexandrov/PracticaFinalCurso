import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFacturaControlComponent } from './crear-factura-control.component';

describe('CrearFacturaControlComponent', () => {
  let component: CrearFacturaControlComponent;
  let fixture: ComponentFixture<CrearFacturaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFacturaControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFacturaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
