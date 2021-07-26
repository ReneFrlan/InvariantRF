
import { Component, OnInit  } from '@angular/core';
 
import { AppData, Review } from 'src/app/app-data';
import { FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
/*
export interface PeriodicElement {
  id: number;
  naziv: string;
  opis: string;
}*/


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit  {
  selectedEpisode = '';
  //displayedColumns: string[] = ['id', 'naziv', 'opis', 'ostalo'];
 

  reviews: Review[] = [];

  displayedColumns: string[] = ['ocjena', 'komentar','ostalo'];
  dataToDisplay = this.data.ELEMENT_DATA;

  selectedReview!: Review;

  len = this.dataToDisplay.length;
 // dataSource = new ExampleDataSource(this.dataToDisplay);
  new = false;

  reviewForm = this.formBuilder.group({
    stars: '',
    commentary: ''
  });



  changeEpisode(e: MatSelectChange){

    this.data.getReviews(e.value);
  }

  selectReview (r:Review) {
    console.log('lista.selectReview')
    this.selectedReview = r;
  }

  addData() {  
    
    console.log('lista.addData')
    if(this.selectedEpisode != ''){
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

  removeData (idx: number) {

    console.log('lista.removeData')
   //  this.data.listaLen-=1
    // console.log("Lista - " + this.data.listaLen)
    this.data.reviews =   this.data.reviews .filter(r => r.id !== idx);
    this.selectedReview = new Review();
  
    // this.dataToDisplay = this.dataToDisplay.slice(idx);
   // this.data.dataSource.setData(this.dataToDisplay);
  }

  temp:any;

  constructor( 
    public data: AppData, 
    private formBuilder: FormBuilder) {
   }

  ngOnInit() {
    
  }

  move(from: number,to: number){
    //this.temp=this.dataToDisplay[destination]

 

     let  t= this.data.reviews[to];

     this.data.reviews[to]   = this.data.reviews[from]; 
     this.data.reviews[from]   = t;
    // this.dataToDisplay[destination]=this.dataToDisplay[origin]
   // this.dataToDisplay[origin]=this.temp
  //zf  this.dataSource.setData(this.dataToDisplay);
  }

  indexUp(i:number){
    this.move(i, i - 1)
  }

  indexDown(i: number){
    this.move(i, i + 1)
    
  }
/*
  view(){
    console.log('lista.view')
    if(this.selectedEpisode != "none"){
      this.data.getReviews(this.selectedEpisode);
      setTimeout(() => this.refresh(), 200);
    }else{
      this.selectedEpisode=''
    }
  }
  */
  refresh(){
    console.log('lista.refresh')
    this.data.dataSource.setData(this.data.ELEMENT_DATA); 
  }

  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
}

  onSubmit(){
    console.log('lista.submit ' + this.selectedEpisode+this.ConvertStringToNumber(this.reviewForm.value.stars)+this.reviewForm.value.commentary)
    
    this.data.createReview(this.selectedEpisode, this.ConvertStringToNumber(this.reviewForm.value.stars),this.reviewForm.value.commentary)
    
    let review = new  Review();
    review.id = this.reviews.length + 1;
    review.stars =  this.ConvertStringToNumber(this.reviewForm.value.stars);
    review.commentary = this.reviewForm.value.commentary;

    this.reviews.push( review);

    this.new = false;
  //zf  this.view()    
  //  this.data.listaLen += 1
  }
 

}

