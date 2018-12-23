import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  /*
  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
    });
  }
  */

  public onSignIn(googleUser) {
    console.log(googleUser);
   
   /* ((u, p) => {
        u.id            = p.getId();
        u.name          = p.getName();
        u.email         = p.getEmail();
        u.imageUrl      = p.getImageUrl();
        u.givenName     = p.getGivenName();
        u.familyName    = p.getFamilyName();
    })(user, googleUser.getBasicProfile());

    ((u, r) => {
        u.token         = r.id_token;
    })(user, googleUser.getAuthResponse());
*/
    // user.save();
    // this.goHome();
  };

}
