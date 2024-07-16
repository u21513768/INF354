import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Course } from '../../shared/course';
import { filter } from 'rxjs/operators'; // Import filter operator
import { trigger, style, animate, transition } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
//Quintin d'Hotman de Villiers u21513768
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
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
export class AddCourseComponent {
  display = false;
  course: Course = {
    name: '', duration: '', description: '',
    courseId: 0
  };

  constructor(private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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
    // Call API to add course
    this.dataService.AddCourse(this.course).subscribe(() => {
      // Navigate back to courses page after adding
      this.router.navigateByUrl('/courses');
    });
  }

  onCancel() {
    // Navigate back to courses page without adding
    this.router.navigateByUrl('/courses');
  }


  triggerAnimation() {
    setTimeout(() => {
      this.display = true;
      this.cdr.detectChanges(); // Trigger change detection manually
    });
  }
}
