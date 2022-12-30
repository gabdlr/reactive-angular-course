import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { Category } from '../model/course';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStoreService } from '../services/courses.store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private coursesStoreService: CoursesStoreService
              ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses(){
    this.beginnerCourses$ = this.coursesStoreService.filterByCategory(Category.BEGINNER);
    this.advancedCourses$ = this.coursesStoreService.filterByCategory(Category.ADVANCED);
  }
  

}




