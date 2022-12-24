import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient ) { }

  loadAllCourses(): Observable<Course[]>{
    return this.httpClient.get<{payload: Course[]}>('/api/courses')
            .pipe(  
              //map( (response) => response['payload'] )
              map( response => response.payload),
              shareReplay()
            );
  }

  saveCourse(courseId: string, changes: Partial<Course>):Observable<any>{
    return this.httpClient.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      )
  }
}
