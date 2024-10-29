import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.scss',
  host: {
    class: 'border-r border-b border-indigo-400',
    //attribute: 'hola',  se puede poner mas variables al contenedor del componente
    //'data-size': 'XL',
  }
})
export class CalculatorButtonComponent {

  public isPressed = signal(false)

  public onClick = output<string>();
  //Function to see viewChild
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')

  public isCommand = input( false , {
      transform: ( value: boolean | string ) =>
        typeof value === 'string' ? value === '' : value,
    })

  public isDoubleSize = input( false , {
      transform: ( value: boolean | string ) =>
        typeof value === 'string' ? value === '' : value,
    })

  @HostBinding('class.w-2/4') get doubleSize()
  {
   return this.isDoubleSize();
  }

  @HostBinding('class.w-1/4') get singleSize()
  {
  return !this.isDoubleSize();
  }

  handleClick()
  {
    if ( !this.contentValue()?.nativeElement )
    {
      return
    }

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string)
  {
    if ( !this.contentValue()) return

    const value = this.contentValue()!.nativeElement.innerText;

    if ( value !== key ) return;

    this.isPressed.set(true);

    setTimeout(() => this.isPressed.set(false), 100);
  }
}
