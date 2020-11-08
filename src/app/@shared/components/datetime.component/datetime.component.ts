import { Component, Input } from '@angular/core';

@Component({
  template: `<span>
    {{ enableAgo ? (date | date: format:timezone | dateAgo) : (date | date: format:timezone) }}
  </span>`,
  styleUrls: ['datetime.component.scss'],
  selector: 'app-date-time',
})
export class DateTimeComponent {
  @Input() timezone = '+0530';
  @Input() format = 'MMM dd, yyyy hh:mm a';
  @Input() date: Date = new Date();
  @Input() enableAgo: boolean;
}
