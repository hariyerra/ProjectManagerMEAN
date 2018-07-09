import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSearchComponent } from './parent-search.component';

describe('ParentSearchComponent', () => {
  let component: ParentSearchComponent;
  let fixture: ComponentFixture<ParentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
