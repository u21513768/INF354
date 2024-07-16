import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Course } from '../../shared/course';
import { trigger, style, animate, transition } from '@angular/animations';
import { filter } from 'rxjs/operators'; // Import filter operator
import { ChangeDetectorRef } from '@angular/core';
//Quintin d'Hotman de Villiers u21513768
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
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

export class EditCourseComponent implements OnInit {
  display = false;
  course: Course = {
    name: '',
    duration: '',
    description: '',
    courseId: 0
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Get the courseId from the route parameters and load the corresponding course
    this.route.paramMap.subscribe(params => {
      const courseId = Number(params.get('courseId'));
      this.dataService.GetCourseById(courseId).subscribe((course: Course) => {
        this.course = course;
        console.log(this.course);
      });
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.triggerAnimation();
    });
  }

  ngAfterViewInit(): void {
    this.triggerAnimation();
  }

  onSubmit() {
    // Call API to edit course
    this.dataService.EditCourse(this.course).subscribe(() => {
      // Navigate back to courses page after editing
      this.router.navigateByUrl('/courses');
    });
  }

  onCancel() {
    // Navigate back to courses page without editing
    this.router.navigateByUrl('/courses');
  }

  triggerAnimation() {
    setTimeout(() => {
      this.display = true;
      this.cdr.detectChanges(); // Trigger change detection manually
    });
  }
}
