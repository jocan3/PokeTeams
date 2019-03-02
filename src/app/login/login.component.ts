import { Component, OnInit } from '@angular/core';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  onUserChangedSubscription: Subscription;
  loading = true;
  returnUrl: string;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.onUserChangedSubscription = this.authService.onUserChanged.subscribe(
      () => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate([this.returnUrl]);
        }
      }
    )
    this.waitForAuth();
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

 waitForAuth() {
  setTimeout(()=>{    //<<<---    using ()=> syntax
     this.loading = false;
  }, 3000);
 }

 public socialSignIn(socialPlatform : string) {
  let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

  if (this.authService.isAuthenticated()) {
    this.router.navigate(['']);
  }
  
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      // console.log(socialPlatform+" sign in data : " , userData);
      this.authService.user = userData;
      this.router.navigate([this.returnUrl]);
      // Now sign-in with userData
    }
  );
}


}
