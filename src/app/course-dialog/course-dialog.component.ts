import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStoreService } from '../services/courses.store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [LoadingService, MessagesService]
})
export class CourseDialogComponent implements AfterViewInit {

    course:Course; 
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesStoreService: CoursesStoreService,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private fb: FormBuilder,
        private messageService: MessagesService) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save(): void{
        const changes = this.form.value;
        this.coursesStoreService.saveCourse(this.course.id,changes)
        .subscribe();
        this.dialogRef.close(changes); 
    }

    close() {
        this.dialogRef.close();
    }

}
