import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';

interface CourseData {
 course: Course;
 lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;
  data$: Observable<CourseData>;
  lessons$: Observable<Lesson[]>;

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute) 
  {

  }

  ngOnInit() {
    const courseId: number = +this.route.snapshot.paramMap.get('courseId');
    const course$ = this.course$ = this.coursesService.loadCourseById(courseId)
                                        .pipe(
                                          startWith(null)
                                        );
    const lessons$ = this.lessons$ = this.coursesService.loadAllCourseLessons(courseId)
                                          .pipe(
                                            startWith([])
                                          );
    this.data$ = combineLatest([course$,lessons$])
                  .pipe(
                    map(([course,lessons]) => ({course,lessons}))
                  )
  }


}











