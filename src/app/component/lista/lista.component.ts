
import { Component, OnInit  } from '@angular/core';
import { AppData, Review } from 'src/app/app-data';
import { FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit  {
  selectedEpisode = '';
  reviews: Review[] = [];

  displayedColumns: string[] = ['ocjena', 'komentar','ostalo'];
  dataToDisplay = this.data.ELEMENT_DATA;
  selectedReview!: Review;
  len = this.dataToDisplay.length;
  new = false;

  reviewForm = this.formBuilder.group({
    stars: '',
    commentary: ''
  });

  changeEpisode(e: MatSelectChange){
    this.data.getReviews(e.value);
  }

  selectReview (r:Review) {
    //console.log('lista.selectReview')
    this.selectedReview = r;
  }

  addData() {   
    //console.log('lista.addData')
    if(this.selectedEpisode != ''){
      this.new = true;
    }

  }

  removeData (idx: number) {
    //console.log('lista.removeData')
    this.data.reviews =   this.data.reviews .filter(r => r.id !== idx);
    this.selectedReview = new Review();
  }

  temp:any;

  constructor( 
    public data: AppData, 
    private formBuilder: FormBuilder) {
   }

  ngOnInit() {
    
  }

  move(from: number,to: number){
     let  t= this.data.reviews[to];
     this.data.reviews[to]   = this.data.reviews[from]; 
     this.data.reviews[from]   = t;
  }

  indexUp(i:number){
    this.move(i, i - 1)
  }

  indexDown(i: number){
    this.move(i, i + 1)
    
  }

  refresh(){
   // console.log('lista.refresh')
    this.data.dataSource.setData(this.data.ELEMENT_DATA); 
  }

  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
}

  onSubmit(){
    //console.log('lista.submit ' + this.selectedEpisode+this.ConvertStringToNumber(this.reviewForm.value.stars)+this.reviewForm.value.commentary)
    this.data.createReview(this.selectedEpisode, this.ConvertStringToNumber(this.reviewForm.value.stars),this.reviewForm.value.commentary)
    let review = new  Review();
    review.id = this.reviews.length + 1;
    review.stars =  this.ConvertStringToNumber(this.reviewForm.value.stars);
    review.commentary = this.reviewForm.value.commentary;

    this.reviews.push( review);

    this.new = false;
  }
 

}

