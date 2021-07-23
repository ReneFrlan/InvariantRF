import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigacijaComponent } from './component/navigacija/navigacija.component';
import { JedanComponent } from './component/jedan/jedan.component';
import { DvaComponent } from './component/dva/dva.component';
import { TriComponent } from './component/tri/tri.component';
import { CetriComponent } from './component/cetri/cetri.component';
import { ListaComponent } from './component/lista/lista.component';

/* mat material*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AppData } from './app-data';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavigacijaComponent,
    JedanComponent,
    DvaComponent,
    TriComponent,
    CetriComponent,
    ListaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    GraphQLModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [AppData],
  bootstrap: [AppComponent]
})
export class AppModule { }
