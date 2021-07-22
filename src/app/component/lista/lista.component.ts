
import { Component, OnInit,OnDestroy  } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
export interface PeriodicElement {
  id: number;
  naziv: string;
  opis: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1, naziv:'Zagreb', opis:'Najveći grad'},
  {id:2, naziv:'Split', opis:'2. najveći grad'},
  {id:3, naziv:'Rijeka', opis:'3. najveći grad'},
  {id:4, naziv:'Osjek', opis:'4. najveći grad'},
];

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit, OnDestroy  {

  displayedColumns: string[] = ['id', 'naziv', 'opis', 'ostalo'];
  dataToDisplay = [...ELEMENT_DATA];
  len = this.dataToDisplay.length;
  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    this.len+=1
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [
      ...this.dataToDisplay,
      ELEMENT_DATA[randomElementIndex]
    ];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.len-=1
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }

  temp:any;
  move(origin:number,destination:number){
    this.temp=this.dataToDisplay[destination]
    this.dataToDisplay[destination]=this.dataToDisplay[origin]
    this.dataToDisplay[origin]=this.temp
    this.dataSource.setData(this.dataToDisplay);
  }

  indexUp(i:number){
    this.move(i, i-1)
  }

  indexDown(i: number){
    this.move(i, i+1)
  }


  constructor() { }

  ngOnInit() {
   
  }
  
  ngOnDestroy() {

  }


}
class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}