import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  value: string = '';

  isVisible: boolean = false;

  @Input()
  message: string = '';

  showCell(): void {
    this.isVisible = true;
    if (this.value === '💣') {
      console.log('You Lost!');
      
    }
  }

}
