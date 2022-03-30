import { SelectItem } from 'primeng/api';
import { CompetenciaListaModel } from './../models/competencia-lista.model';
import { CompetenciaFormComponent } from './../components/competencia-form/competencia-form.component';
import { Observable } from 'rxjs';
import { CompetenciaModel } from './../models/competencia.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: "root",
})
export class CompetenciaService {

    constructor(private http: HttpClient) { }

    protected UrlService: string = environment.apiUrl;

    getCompetencias(): Observable<CompetenciaListaModel[]> {
        return this.http.get<CompetenciaListaModel[]>(this.UrlService + "/competencia")
    }

    postCompetencia(competencia: CompetenciaModel): Observable<CompetenciaModel> {
        return this.http.post<CompetenciaModel>(this.UrlService + "/competencia", competencia)
    }

    putCompetencia(competencia: CompetenciaModel): Observable<CompetenciaModel> {
        const url = `${this.UrlService}/competencia/${competencia.id}`
        return this.http.put<CompetenciaModel>(url, competencia)
    }

    deleteCompetencia(id: number): Observable<CompetenciaModel> {
        const url = `${this.UrlService}/competencia/${id}`
        return this.http.delete<CompetenciaModel>(url);
    }

    listarCompetenciaComoDropDown(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.UrlService + "/competencia/dropdown");
    }

}

