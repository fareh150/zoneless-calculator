import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

describe('CalculatorButtonComponent', () => {

  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    console.log(compiled)
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 class when isDoubleSize is false', () =>
  {
    expect(compiled.classList).toContain(('w-1/4'));
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 class when isDoubleSize is true', () =>
  {
    // change some in component
    fixture.componentRef.setInput('isDoubleSize', true);
    // detect changes
    fixture.detectChanges();

    expect(compiled.classList).toContain(('w-2/4'));
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick event when button is clicked', () =>
  {
    // espías
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalled();
    // expect(component.onClick.emit).toHaveBeenCalledWith('1');
  });
});
