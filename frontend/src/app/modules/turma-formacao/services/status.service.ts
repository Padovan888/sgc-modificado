import { SelectItem } from 'primeng/api';
import { Observable } from "rxjs";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StatusModel } from "../models/status.model";

@Injectable({
    providedIn: "root",
})
export class StatusService {
    constructor(private http: HttpClient) { }

    protected UrlService: string = environment.apiUrl;

    getStatus(): Observable<StatusModel[]> {
        return this.http.get<StatusModel[]>(this.UrlService + "/status");
    }

    getStatusComoDropDown(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.UrlService + "/status/dropdown");
    }

}
