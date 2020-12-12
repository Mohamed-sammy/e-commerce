import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  // sort array of property by arg of user
  transform(value: Array<string>, args: any[]): any {
    // user send first arg to sorting the array and the direction
  const sortField = args[0];
  const sortDirection = args[1];
  // to reverse sorting
  let multiplier = 1;

  if (sortDirection === 'desc') {
      multiplier = -1;
  }
      //comparing the items in the array
    value.sort((a: any, b: any) =>{
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });
    return value;
  }

}
