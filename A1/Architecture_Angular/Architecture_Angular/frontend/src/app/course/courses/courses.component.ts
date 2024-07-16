import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Import Router
import { Course } from '../../shared/course';
import { DataService } from '../../services/data.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { filter } from 'rxjs/operators'; // Import filter operator
import { ChangeDetectorRef } from '@angular/core';
//Quintin d'Hotman de Villiers u21513768
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  display = false;

  constructor(private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.GetCourses();
    console.log(this.courses);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.triggerAnimation();
    });
  }

  ngAfterViewInit(): void {
    this.triggerAnimation();
  }

  GetCourses() {
    this.dataService.GetCourses().subscribe(result => {
      let courseList: any[] = result;
      courseList.forEach((element) => {
        this.courses.push(element);
      });
    });
  }



  DeleteCourse(course: Course) {
    this.dataService.DeleteCourse(course.courseId).subscribe(() => {
      this.courses = [];
      this.GetCourses();
    });
  }

  EditCourse(course: Course) {
    this.router.navigateByUrl(`/edit-course/${course.courseId}`);
  }

  triggerAnimation() {
    setTimeout(() => {
      this.display = true;
      this.cdr.detectChanges(); // Trigger change detection manually
    });
  }
}
