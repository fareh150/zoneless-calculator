import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () =>
  {
    // Arrange
    const num1 = 1;
    const num2 = 2;

    // Act
    const result = num1 + num2;

    // Assert
    expect(result).toBe(3);
  })

   it(`should have the 'zoneless-calculator' title`, () => {
     const app = fixture.componentInstance;
     expect(app.title).toEqual('zoneless-calculator');
   });

    it('should render title', () => {
      //expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
    });
});
