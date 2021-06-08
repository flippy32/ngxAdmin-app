import {Injectable} from '@angular/core'
import {CanActivate} from '@angular/router'
import {NbAuthService} from '@nebular/auth'
import {tap} from 'rxjs/operators'


@Injectable()
export class AuthGuard implements CanActivate {
    [x: string]: any;

    constructor(private authService: NbAuthService){

    }

    canActivate(){
        return this.authService.isAuthenticated()
        .pipe(
            tap(authenticated => {
                if (!authenticated){
                    this.router.navigate(['auth/login']);
                }
            }),
        );
    }
}