import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-emptyview',
  templateUrl: './emptyview.component.html',
  styleUrls: ['./emptyview.component.scss'],
})
export class EmptyviewComponent implements OnInit {

  @Input() message;
  @Input() icon;
  @Input() type = 'icon';
  constructor() { }

  ngOnInit() {}

}
