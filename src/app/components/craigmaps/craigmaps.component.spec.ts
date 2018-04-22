import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraigmapsComponent } from './craigmaps.component';

describe('CraigmapsComponent', () => {
  let component: CraigmapsComponent;
  let fixture: ComponentFixture<CraigmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraigmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraigmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
