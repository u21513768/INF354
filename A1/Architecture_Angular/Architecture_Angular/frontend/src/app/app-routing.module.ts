import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './course/courses/courses.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';

const routes: Routes = [
  {path: 'courses', component: CoursesComponent, data: { animation: 'fade' }},  
  {path: 'add-course', component: AddCourseComponent, data: { animation: 'fade' }},
  {path: 'edit-course/:courseId', component: EditCourseComponent, data: { animation: 'fade' }},
  {path: '', redirectTo: '/courses', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
