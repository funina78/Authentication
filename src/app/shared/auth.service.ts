import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var firebase: any;

@Injectable()
export class AuthService {

    constructor(private router: Router){}

    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .catch(function(error) {
           console.log(error);
        });
    }

    signinUser(user: User) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .catch(function(error) {
            console.log(error);
        });
    }

    logout() {
        firebase.auth().signOut();
        this.router.navigate(['/signin']);  //use absolute path
    }

    isAuthenticated() {
        var user = firebase.auth().currentUser;

        if(user) {
            // user is signed in
            return true;
        } else {
            // No user is signed in
            return false;
        }
    }
}
