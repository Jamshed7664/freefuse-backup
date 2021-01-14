import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSpinnerComponent } from './sectionSpinner.component';

describe('SpinnerComponent', () => {
  let component: SectionSpinnerComponent;
  let fixture: ComponentFixture<SectionSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
