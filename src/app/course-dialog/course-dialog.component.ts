import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    course:Course; 
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesService: CoursesService,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private fb: FormBuilder) {

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

    save() {

        const changes = this.form.value;
        this.coursesService.saveCourse(this.course.id,changes)
            .subscribe({
                next: (value) => this.dialogRef.close(value)
            })
    }

    close() {
        this.dialogRef.close();
    }

}
