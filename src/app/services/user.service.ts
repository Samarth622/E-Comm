import { EventEmitter, Injectable } from '@angular/core';
import { Login, UserSignup } from '../../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignup(data: UserSignup) {
    this.http.post('http://localhost:3000/users', data, { observe: 'response' }).subscribe((result) => {
      console.log(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

  userLogin(data: Login) {
    this.http.get<UserSignup[]>(
      `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    )
      .subscribe((result: any) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        }
        else{
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
