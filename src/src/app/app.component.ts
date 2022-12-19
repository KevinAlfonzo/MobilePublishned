import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  isActive = [false, false, false, false, false];
  isLogin: boolean;
  url: any;
  
  constructor(private router: Router, private authService: AuthService) {
    this.isLogin = true;
  }

  ngOnInit(): void {
    
  }

  clickEvent(index: number) {
    if (!this.isActive[index]) {
      this.isActive = new Array(false, false, false, false, false);
      this.isActive[index] = true;
    }

    if (index == 4) {
      this.authService.deleteSession;
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }

  removerMenu() {
    this.url = this.router.url;
    if (this.url == "/login") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

}
