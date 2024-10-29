import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.scss',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    //attribute: 'hola',  se puede poner mas variables al contenedor del componente
    //'data-size': 'XL',
  }
})
export class CalculatorButtonComponent {
  public isCommand = input( false , {
      transform: ( value: boolean | string ) =>
        typeof value === 'string' ? value === '' : value,
    })

    @HostBinding('class.is-command') get commandStyle() {
      return this.isCommand();
    }
}
