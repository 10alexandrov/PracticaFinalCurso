import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFacturaNewComponent } from './crear-factura-new.component';

describe('CrearFacturaNewComponent', () => {
  let component: CrearFacturaNewComponent;
  let fixture: ComponentFixture<CrearFacturaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFacturaNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFacturaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
