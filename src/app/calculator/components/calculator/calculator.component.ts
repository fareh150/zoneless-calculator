import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
  // styles: `
  //   .is-command {
  //     @apply bg-indigo-700 bg-opacity-20;
  //   }
  // `,
})
export class CalculatorComponent
{
  //                        👇pilla muchos datos, () les decimos de que componente queremos que lo pille , en este caso todos los calculator buttons  que ponemos para crear la calculadora
  public calculatorButtons = viewChildren( CalculatorButtonComponent );

  handleClick(key: string): void
  {
    console.log({key});
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyboardEvent( event: KeyboardEvent )
  {
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      '*': 'x',
      '/': '÷',
      Enter: '=',
      Escape: 'C',
      Clear: 'C',
    };

    //verifica si se produce uno de estos valores
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick( keyValue );

    this.calculatorButtons().forEach( (button) =>
      {
        button.keyboardPressedStyle(keyValue);
      })
  }
}
