import { Component, OnDestroy } from "@angular/core";
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'my-header',
    template: `

        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">

                    <ul class="nav navbar-nav">

                        <li><a [routerLink]="['signup']">Sign Up</a></li>
                        <li><a [routerLink]="['signin']">Sign In</a></li>
                        <li><a [routerLink]="['protected']">Protected</a></li>

                    </ul>
                    <ul class="nav navbar-nav navbar-right" *ngIf="isAuth()">

                        <li><a (click)="onLogout()" style="cursor: pointer;">Logout</a></li>
                    </ul>
                </div><!-- /.container-fluid -->

            </nav>

        </header>
    `
})
export class HeaderComponent implements OnDestroy{
    isAuthenticated = false;
    private subscription: Subscription;  //why we need a subscription? because I want to control the thing I listen to, and I can destroy it onDestroy.

    constructor(private authService: AuthService) {
        this.subscription = this.authService.isAuthenticated().subscribe(
            authStatus => this.isAuthenticated = authStatus
        );
    }

    isAuth() {
        return this.authService.isAuthenticated;
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();   //unsubscribe the subscription on destroy of the component
    }
}
