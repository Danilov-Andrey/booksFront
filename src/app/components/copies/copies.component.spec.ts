import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiesComponent } from './copies.component';

describe('CopiesComponent', () => {
  let component: CopiesComponent;
  let fixture: ComponentFixture<CopiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
