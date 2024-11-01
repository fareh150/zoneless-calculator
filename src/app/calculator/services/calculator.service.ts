import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const operators = ['+', '-', 'x', '÷', '*', '/']; // aqui poner * o /

const specialOperators = ['C', '+/-', '=', '%', '.', ',', 'Backspace'];


@Injectable({
  providedIn: 'root'
})
export class CalculatorService
{
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber (value:string): void
  {
    // Validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value))
    {
      console.log('Invalid input');
      return;
    }

    if (value === '=')
    {
      this.calculateResult();
      return;
    }

    // Clear  all
    if (value === 'C')
    {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    // Todo : revisar negativos
    if (value === 'Backspace')
    {
      if (this.resultText() === '0') return;

      if (this.resultText().length === 2 && this.resultText().includes('-'))
      {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1)
      {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((prev) => prev.slice(0, -1));
      return;
    }

    // Aplicar operadores
    if (operators.includes(value))
    {
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }
    // limitar caracteres
    if (this. resultText().length >= 8)
    {
      console.log('Max length reached');
      return;
    }

    // Decimal
    if ((value === '.' || value === ',') && !this.resultText().includes('.'))
    {
      if (this.resultText() === '0' || this.resultText() === '')
      {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((prev) => prev + '.');
      return;
    }
    if ((value === '.' || value === ',')  && this.resultText().includes('.'))
    {
      return;
    }

    // manage initial 0
    if (value === '0' && (this.resultText() === '0'|| this.resultText() === '-0'))
    {
      return;
    }

    // cambiar signo
    if (value === '+/-')
    {
      if (this.resultText().includes('-'))
      {
        this.resultText.update((text) => text.slice(1));
        return;
      }
      this.resultText.update(text => '-' + text);
      return;
    }

    // numbers
    if (numbers.includes(value))
    {
      if(this.resultText() === '0')
      {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0')
      {
        this.resultText.set('-' + value);
        return;
      }
      this.resultText.update( (prev) => prev + value );
      return;
    }
  }

  public calculateResult(): void
  {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator())
    {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }
    this.resultText.set(result.toString());
    this.subResultText.set('0');

  }
}
