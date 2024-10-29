import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    //attribute: 'hola',  se puede poner mas variables al contenedor del componente
    //'data-size': 'XL',
  }
})
export class CalculatorButtonComponent { }
