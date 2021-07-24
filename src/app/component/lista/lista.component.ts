
import { Component, OnInit  } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { AppData } from 'src/app/app-data';
import { FormBuilder } from '@angular/forms';
/*
export interface PeriodicElement {
  id: number;
  naziv: string;
  opis: string;
}*/

export interface Review{
  stars: number;
  commentary: string;
}
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit  {
  selectedEpisode = '';
  //displayedColumns: string[] = ['id', 'naziv', 'opis', 'ostalo'];
  displayedColumns: string[] = ['ocjena', 'komentar','ostalo'];
  dataToDisplay = this.data.ELEMENT_DATA
  len = this.dataToDisplay.length;
  dataSource = new ExampleDataSource(this.dataToDisplay);
  new=false

  reviewForm = this.formBuilder.group({
    stars: '',
    commentary: ''
  });

  addData() {   
    if(this.selectedEpisode!= ''){
      this.new = true;
    }

    /*
    const randomElementIndex = Math.floor(Math.random() * this.data.ELEMENT_DATA.length);
    this.dataToDisplay = [
      ...this.dataToDisplay,
      this.data.ELEMENT_DATA[randomElementIndex]
    ];
    this.dataSource.setData(this.dataToDisplay);*/
  }

  removeData() {
    this.data.listaLen-=1
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
  }

  indexDown(i: number){
    this.move(i, i+1)
    
  }

  view(){
    if(this.selectedEpisode!="none"){
      this.data.getReviews(this.selectedEpisode);
      setTimeout(() => this.refresh(), 100);
    }else{
      this.selectedEpisode=''
    }
  }

  constructor( 
    public data: AppData, 
    private formBuilder: FormBuilder,) {
   }

  ngOnInit() {
    
  }
  refresh(){
    this.dataSource.setData(this.data.ELEMENT_DATA); 
  }

  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
}

  onSubmit(){
    console.log(this.selectedEpisode+this.ConvertStringToNumber(this.reviewForm.value.stars)+this.reviewForm.value.commentary)
    this.data.createReview(this.selectedEpisode,this.ConvertStringToNumber(this.reviewForm.value.stars),this.reviewForm.value.commentary)
    this.new = false;
    this.view()    
    this.data.listaLen+=1
  }
 

}
class ExampleDataSource extends DataSource<Review> {
  private _dataStream = new ReplaySubject<Review[]>();

  constructor(initialData: Review[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Review[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Review[]) {
    this._dataStream.next(data);
  }
}