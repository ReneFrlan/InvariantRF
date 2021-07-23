import { Component, OnInit,Input } from '@angular/core';
import { AppData } from 'src/app/app-data';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.css']
})
export class NavigacijaComponent implements OnInit {

  constructor( public data: AppData) { }

  ngOnInit(): void {

  }


}
