import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardfourComponent } from './boardfour.component';

describe('BoardfourComponent', () => {
  let component: BoardfourComponent;
  let fixture: ComponentFixture<BoardfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardfourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
