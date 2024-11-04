import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test content</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

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

  it('should set isPressed to true and then false when keyboardPressStyle is called with a matching key', (done) =>
  {
    // se pone ! por que se que siempre va a existir
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBeTrue();
    //asincronos
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      // se pone done para conseguir datos asyncronos
      done();
    }
    , 101);
  });

  it('should not set isPress to true if key is not match', () =>
    {
      component.contentValue()!.nativeElement.innerText = '1';
      component.keyboardPressedStyle('2');
      expect(component.isPressed()).toBeFalse();
    });
});
