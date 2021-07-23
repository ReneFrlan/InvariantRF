import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './component/lista/lista.component';
import { JedanComponent } from './component/jedan/jedan.component';

const routes: Routes = [
  { path: 'lista', component: ListaComponent},
  {path: '', component: JedanComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
