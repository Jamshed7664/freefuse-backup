import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (!(!!window.localStorage.getItem('email'))) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  }
