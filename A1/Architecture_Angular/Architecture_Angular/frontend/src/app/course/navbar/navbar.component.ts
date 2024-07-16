import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Quintin d'Hotman de Villiers u21513768
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    display = false;
    isAddCoursePage: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (this.router.url === '/add-course') {
                this.isAddCoursePage = true;
            } else {
                this.isAddCoursePage = false;
            }
        });
    }

    navigateTo(url: string) {
        this.router.navigateByUrl(url);
    }


}
