import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {CoursesService} from '../services/courses.service';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messages/message.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        catchError(err => {
            const message = 'could not load courses';
            this.messagesService.showErrors(message);
            console.log(message, err);
          /** return a new observable which will replace the observable that has errored out
           * throw error creates a new observable that immediately emits the error and end the lifecycle
           */
          return throwError(err);
          }
        )
      )
    ;

    const loadCourses$ = this.loadingService.showLoaderUntilComplete(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER'))
    );
    this.advancedCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == 'ADVANCED'))
    );
  }
}




