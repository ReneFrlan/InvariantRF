import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './component/lista/lista.component';
import { JedanComponent } from './component/jedan/jedan.component';
import { DvaComponent } from './component/dva/dva.component';
import { TriComponent } from './component/tri/tri.component';
import { CetriComponent } from './component/cetri/cetri.component';

const routes: Routes = [
  { path: 'lista', component: ListaComponent},
  {path: '', 
  component: JedanComponent, 
  children:[
    {path: '', component: DvaComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
