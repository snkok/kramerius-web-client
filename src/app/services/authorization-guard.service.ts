import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

import {AppConfigurationService} from "../services/app-configuration.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard extends KeycloakAuthGuard implements CanActivate {

    constructor(protected router: Router,
                public keycloakAngular: KeycloakService,
                public appConfigService: AppConfigurationService) {
        super(router, keycloakAngular);
    }

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        console.debug(route.url);

        return new Promise((resolve, reject) => {

            if (!this.appConfigService.authConfiguration.enabled){
                return resolve(true);
            }
            if (this.authenticated) {
                return resolve(true);
            }else{
                this.keycloakAngular.login();
                return resolve(false);
            }
        });
    }

}
