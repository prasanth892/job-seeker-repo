import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'AgePipe'
})
export class AgePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {

  	if (!value) return value;

		return moment().diff(value, 'years')+" Years";  }

}
