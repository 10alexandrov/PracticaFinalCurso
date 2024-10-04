import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeZeroAndForma',
  standalone: true
})
export class RemoveZeroAndFormaPipe implements PipeTransform {

  transform(value: string | number): string {

    let numStr = value.toString();

    numStr = numStr.replace(/^0+/, '');

    const formattedNumber = parseFloat(numStr).toFixed(2);

    return formattedNumber;
  }

}
