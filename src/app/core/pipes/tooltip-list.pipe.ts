import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipList',
})
export class TooltipListPipe implements PipeTransform {
  /* eslint-disable-next-line */
  transform(lines: string[]): string {
    let list = '';

    lines.forEach((line) => {
      list += `•  ${line} \r\n\r\n`;
    });

    return list;
  }
}
