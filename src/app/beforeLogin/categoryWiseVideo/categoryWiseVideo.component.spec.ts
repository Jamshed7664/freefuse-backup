import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseVideoComponent } from './categoryWiseVideo.component';

describe('CategoryWiseVideoComponent', () => {
  let component: CategoryWiseVideoComponent;
  let fixture: ComponentFixture<CategoryWiseVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
