import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthAdminService } from './auth/auth-admin.service';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private authAdminService: AuthAdminService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.setLayout('Admin');
    this.authAdminService.autoAuthUser();

    this.userIsAuthenticated = this.authAdminService.getIsAuth();
    this.authListenerSubs = this.authAdminService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(isAuthenticated);
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
