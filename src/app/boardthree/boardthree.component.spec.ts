import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardthreeComponent } from './boardthree.component';

describe('BoardthreeComponent', () => {
  let component: BoardthreeComponent;
  let fixture: ComponentFixture<BoardthreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardthreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
