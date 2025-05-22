import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterdashboardComponent } from './testerdashboard.component';

describe('TesterdashboardComponent', () => {
  let component: TesterdashboardComponent;
  let fixture: ComponentFixture<TesterdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesterdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesterdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
