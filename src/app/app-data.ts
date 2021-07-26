import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable, ReplaySubject } from "rxjs";
/*
export interface PeriodicElement {
  id: number;
  naziv: string;
  opis: string;
}*/





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

  public ELEMENT_DATA: Review[] = [];
  public listaLen: any;

  public reviews: Review[] = [];
  dataSource = new ExampleDataSource(this.ELEMENT_DATA);



  getReviews(episode: string) {

    console.log('data.getReviews');
    // this.ELEMENT_DATA.length=0;
    this.ELEMENT_DATA = [];

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
        variables: { "ep": episode }
      })
      .subscribe(
        ({ data }) => {

          console.log('data.reviews.load');

          for (let i = 0; i < data.reviews.length; i++) {
            this.ELEMENT_DATA.push({
              id : i,
              stars: data.reviews[i].stars,
              commentary: data.reviews[i].commentary
            })
          }

          this.reviews = this.ELEMENT_DATA;

          this.dataSource.setData(this.ELEMENT_DATA);
          this.listaLen = this.ELEMENT_DATA.length;
        }
      );
  }
  createReview(episode: string, stars: number, review: string) {
    console.log('data.createReview ' + episode + stars + review)
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
        },
        refetchQueries: [{
          query: gql`
              
                query updateCache($ep: Episode!) {
                  reviews(episode: $ep){
                    stars,
                    commentary
                  }
                }
            `,
          variables: {
            "ep": episode
          }
        }]
      })
      .subscribe((value) => {
        console.log('data.createReview.load');

        setTimeout(() => this.getReviews(episode), 100);
      });

    // 
    console.log("data.review.completed")
  }
}


export class ExampleDataSource extends DataSource<Review> {
  private _dataStream = new ReplaySubject<Review[]>();

  constructor(initialData: Review[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Review[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: Review[]) {
    this._dataStream.next(data);
  }
}

export class Review {
  id: number | undefined;
   stars: number | undefined;
   commentary: string | undefined;
}