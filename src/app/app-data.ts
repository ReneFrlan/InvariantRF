import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export interface PeriodicElement {
  id: number;
  naziv: string;
  opis: string;
}
@Injectable()
export class AppData {

  constructor(private apollo: Apollo) { }

  public ELEMENT_DATA: PeriodicElement[] = [
    { id: 1, naziv: 'Zagreb', opis: 'Najveći grad' },
    { id: 2, naziv: 'Split', opis: '2. najveći grad' },
    { id: 3, naziv: 'Rijeka', opis: '3. najveći grad' },
    { id: 4, naziv: 'Osjek', opis: '4. najveći grad' },
  ];
  public listaLen = this.ELEMENT_DATA.length;

  test() {
    this.apollo
      .query<any>({
        query: gql`
        {
          hero {
            name
            friends {
              name
            }
          }
        }
        `
      })
      .subscribe(
        ({ data }) => {
          console.log(data)
          /*this.books = data && data.books;*/
        }
      );
  }

  getReviews(episode: string) {
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
        ({ data }) => {
          console.log(data)
          /*this.books = data && data.books;*/
        }
      );
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
