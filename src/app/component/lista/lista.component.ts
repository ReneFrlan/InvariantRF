
import { Component, OnInit  } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { AppData } from 'src/app/app-data';
import { Apollo } from "apollo-angular";

export interface PeriodicElement {
  id: number;
  naziv: string;
  opis: string;
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit  {
  selectedEpisode = '';
  displayedColumns: string[] = ['id', 'naziv', 'opis', 'ostalo'];
  dataToDisplay = this.data.ELEMENT_DATA
  len = this.dataToDisplay.length;
  dataSource = new ExampleDataSource(this.dataToDisplay);



  addData() {
    this.len += 1;
    this.data.listaLen= this.len
    const randomElementIndex = Math.floor(Math.random() * this.data.ELEMENT_DATA.length);
    this.dataToDisplay = [
      ...this.dataToDisplay,
      this.data.ELEMENT_DATA[randomElementIndex]
    ];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.len-=1
    this.data.listaLen= this.len
    console.log("Lista - "+ this.data.listaLen)
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
    this.data.createReview("EMPIRE",3,"Odlican")

  }

  indexDown(i: number){
    this.move(i, i+1)
    
  }

  view(){
    this.data.getReviews(this.selectedEpisode)
  }

  constructor( public data: AppData, private apollo: Apollo) {
   }

  ngOnInit() {
    this.data.listaLen= this.len
    
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