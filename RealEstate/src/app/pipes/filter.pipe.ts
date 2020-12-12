import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  //filter property array by property filter
  transform(value: any[], filterString: string ,propName:string): any[] {
    //Push filter data in this array
    const resualtArray = [];
    if (value.length === 0 || filterString === '' || propName === '') {
      return value;
    }

    for (const item of value) {
      if (item[propName] === filterString) {
        resualtArray.push(item);
      }
    }
    return resualtArray;
  }

}
