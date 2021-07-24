import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
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

@Injectable()
export class AppData {

  constructor(private apollo: Apollo) { }
/*
  public ELEMENT: PeriodicElement[] = [
    { id: 1, naziv: 'Zagreb', opis: 'Najveći grad' },
    { id: 2, naziv: 'Split', opis: '2. najveći grad' },
    { id: 3, naziv: 'Rijeka', opis: '3. najveći grad' },
    { id: 4, naziv: 'Osjek', opis: '4. najveći grad' },
  ];*/

  public ELEMENT_DATA: Review[]=[];
  public listaLen:any;

   getReviews(episode: string) {
     this.ELEMENT_DATA.length=0;
    this.apollo
      .query<any>({
        query: gql`
        query get($ep: Episode!) {
          reviews(episode: $ep){
            stars,
            commentary
          }
        }
          `,
          variables: {"ep": episode}
      })
      .subscribe(
        ({ data }) =>  {
          for(let i=0;i<data.reviews.length;i++){
            this.ELEMENT_DATA.push({
                stars: data.reviews[i].stars, 
                commentary: data.reviews[i].commentary
              })
            
            /*this.ELEMENT_DATA[i].stars=data.reviews.reviews[i].stars
            this.ELEMENT_DATA[i].commentary=data.reviews[i].commentary*/
          }
   
          console.log(this.ELEMENT_DATA)
        }
        
      );
      this.listaLen= this.ELEMENT_DATA.length;
  }
  createReview(episode: string, stars: number, review:string) {
    console.log(episode+stars+review)
  this.apollo
      .mutate<any>({
        mutation: gql`
        mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
          createReview(episode: $ep, review: $review) {
            stars
            commentary
          }
        }
          `,
          variables: {
            "ep": episode, 
            "review": {
              "stars": stars, 
              "commentary": review
            }
          }
      })
      .subscribe();
      console.log("review completed")
  }
}
