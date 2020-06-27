import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationlistComponent } from './animationlist.component';

describe('AnimationlistComponent', () => {
  let component: AnimationlistComponent;
  let fixture: ComponentFixture<AnimationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
