import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardoneComponent } from './boardone.component';

describe('BoardoneComponent', () => {
  let component: BoardoneComponent;
  let fixture: ComponentFixture<BoardoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
