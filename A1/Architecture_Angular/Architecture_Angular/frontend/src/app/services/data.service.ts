import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://localhost:7049/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }

  GetCourses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/`) //return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
    .pipe(map(result => result))
  }

  GetCourseById(courseId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/${courseId}`)
    .pipe(map(result => result))
  }

  AddCourse(course: any): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}Course/`, course, this.httpOptions)
    .pipe(map(result => result))
  }

  DeleteCourse(courseId: Number): Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}Course/${courseId}`)
    .pipe(map(result => result))
  }

  EditCourse(course: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}Course/${course.courseId}`, course, this.httpOptions)
      .pipe(
        map(result => result)
      );
  }
  

}


