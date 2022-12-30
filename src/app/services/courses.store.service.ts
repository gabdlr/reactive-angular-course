import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { Category, Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  
  courses$: Observable<Course[]>;
  private subject = new BehaviorSubject<Course[]>([]);
  constructor(private httpClient: HttpClient,
              private loadingService: LoadingService,
              private messagesService: MessagesService) 
  { 
    this.courses$ = this.subject.asObservable();
    this.loadAllCourses();
  }

  filterByCategory(category: Category):Observable<Course[]>{
    return this.courses$
      .pipe(
        map(courses => courses.filter( course => course.category === category)
                              .sort(sortCoursesBySeqNo)
        )
      ); 
  }

  saveCourse(courseId: string, changes: Partial<Course>):Observable<Course>{
    const courses = this.subject.getValue();
    const index = courses.findIndex( course => course.id === courseId);
    const newCourse: Course = {
      ...courses[index],
      ...changes
    };
    const newCourses: Course[] = courses.slice();
    newCourses[index] = newCourse;
    this.subject.next(newCourses)
    return this.httpClient.put<Course>(`/api/courses/${courseId}`, changes)
    .pipe(
      catchError( err => {
        this.subject.next(courses);
        const message = "Could not save course";
        this.messagesService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    )
  }

  private loadAllCourses(): void{
    const loadCourses$ = this.httpClient.get<{payload:Course[]}>('/api/courses')
        .pipe(
          map( response => response.payload),
          catchError(err => {
            const errorMessage = "Could not load all courses";
            this.messagesService.showErrors(errorMessage);
            return throwError(err);
          }),
          tap(courses => this.subject.next(courses))
        );
    
    this.loadingService.showLoaderUntillCompleted(loadCourses$).subscribe();
  }
}
// reloadCourses(){
//   const courses$ = this.coursesService.loadAllCourses()
//     .pipe(
//       map( courses => courses.sort(sortCoursesBySeqNo)),
// catchError(err => {
//   const errorMessage = "Could not load all courses";
//   this.messageService.showErrors(errorMessage);
//   return throwError(err)})
//     );

//     const loadCourses$ = this.loadingService.showLoaderUntillCompleted(courses$);