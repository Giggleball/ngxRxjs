import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {filter, tap} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {Course} from '../model/course';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  @Output()
  private coursesChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
      // tap is used for producing side effects, any other side effect ouise the obseervable chain
      tap(() => this.coursesChanged.emit())
      )
        .subscribe();
  }
}
