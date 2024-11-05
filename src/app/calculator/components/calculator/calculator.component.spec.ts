import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

class MockCalculatorService
{
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {

  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // Get the provided MockCalculatorService
    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;

    //fixture.detectChanges();
  });

  it('should create the app', () => {
    console.log(compiled);

    expect(component).toBeTruthy();
  });

  it('should have the current getters', () =>
  {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display calculation values', () =>
    {
      mockCalculatorService.resultText.and.returnValue('123');
      mockCalculatorService.subResultText.and.returnValue('456');
      mockCalculatorService.lastOperator.and.returnValue('*');

      fixture.detectChanges();

      expect(compiled.querySelector('span')?.innerText).toBe('456 *');


      expect(component.resultText()).toBe('123');
      expect(component.subResultText()).toBe('456');
      expect(component.lastOperator()).toBe('*');
    });

    it('should have 19 calculator-buttons components', () =>
    {
      expect(component.calculatorButtons()).toBeTruthy();
      expect(component.calculatorButtons().length).toBe(19);
    })

    it('should have 19 calculator-buttons with content projection', () =>
      {
        // const buttonsByDirective = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent));
        const buttons = compiled.querySelectorAll('calculator-button');

        expect(buttons.length).toBe(19);

        expect(buttons[0].textContent?.trim()).toBe('C');
        expect(buttons[1].textContent?.trim()).toBe('+/-');
        expect(buttons[2].textContent?.trim()).toBe('%');
        expect(buttons[3].textContent?.trim()).toBe('÷');
      })

    it('should handle keyboard events correctly', () =>
    {
      const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
      document.dispatchEvent(eventEnter);
      expect( mockCalculatorService.constructNumber ).toHaveBeenCalledWith('=');

      const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
      document.dispatchEvent(eventEscape);
      expect( mockCalculatorService.constructNumber ).toHaveBeenCalledWith('C');

      const eventClear = new KeyboardEvent('keyup', { key: 'Clear' });
      document.dispatchEvent(eventClear);
      expect( mockCalculatorService.constructNumber ).toHaveBeenCalledWith('C');

      const eventMultiplier = new KeyboardEvent('keyup', { key: '*' });
      document.dispatchEvent(eventMultiplier);
      expect( mockCalculatorService.constructNumber ).toHaveBeenCalledWith('x');
    });
});
