import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherComponent} from './teacher/teacher.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '', component: TeacherComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
