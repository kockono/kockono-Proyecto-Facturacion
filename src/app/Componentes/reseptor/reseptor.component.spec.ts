import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseptorComponent } from './reseptor.component';

describe('ReseptorComponent', () => {
  let component: ReseptorComponent;
  let fixture: ComponentFixture<ReseptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReseptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
