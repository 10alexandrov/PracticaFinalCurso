import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenShowComponent } from './almacen-show.component';

describe('AlmacenShowComponent', () => {
  let component: AlmacenShowComponent;
  let fixture: ComponentFixture<AlmacenShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
