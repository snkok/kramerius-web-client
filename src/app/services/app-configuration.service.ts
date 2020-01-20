import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {KeycloakConfig} from "keycloak-angular";
import {AuthConfiguration} from "../model/auth-configuration";


/**
 * Servis vracia konfiguracne hodnoty z BE. (vid. krameriusbackend.controler.AppConfigurationController)
 */
@Injectable({
    providedIn: 'root'
})
export class AppConfigurationService {

    keycloakConfiguration: KeycloakConfig;
    authEnabled:boolean = true;
    authConfiguration:AuthConfiguration;

    constructor(private http: HttpClient) {}

    getAuthConfig(): Observable<AuthConfiguration> {
        //todo (gt) - ked bude prenasadeny BE, treba tuto linku zmenit na ../client-auth-config, vid krameriusbackend.controler.AppConfigurationController
        const url = '/public/app-configuration-controller/auth-config';
        return this.http.get<AuthConfiguration>(url);
    }

}
