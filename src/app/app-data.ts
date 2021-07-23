import { Injectable } from "@angular/core";
export interface PeriodicElement {
    id: number;
    naziv: string;
    opis: string;
  }
@Injectable()
export class AppData {

    public ELEMENT_DATA: PeriodicElement[] = [
        {id:1, naziv:'Zagreb', opis:'Najveći grad'},
        {id:2, naziv:'Split', opis:'2. najveći grad'},
        {id:3, naziv:'Rijeka', opis:'3. najveći grad'},
        {id:4, naziv:'Osjek', opis:'4. najveći grad'},
      ];
      public listaLen=this.ELEMENT_DATA.length;
}
