import { CompetenciaListaModel } from "./../../models/competencia-lista.model";
import { ConfirmationService, Message, MessageService } from "primeng/api";
import { CompetenciaModel } from "./../../models/competencia.model";
import { CompetenciaService } from "../../services/competencia.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-competencia-list",
    templateUrl: "./competencia-list.component.html",
    styleUrls: ["./competencia-list.component.css"],
})
export class CompetenciaListComponent implements OnInit {
    cols: any[];
    competencias: CompetenciaListaModel[];
    display: boolean = false;
    competenciaEditada: CompetenciaModel;

    constructor(
        private competenciaService: CompetenciaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getCompetencias();
        this.columns();
    }

    atualizarCompetencia(evento) {
        this.getCompetencias();
    }

    showDialog(edit: boolean) {
        this.display = true;
        this.competenciaEditada = edit ? this.competenciaEditada : undefined;
    }

    public columns() {
        this.cols = [
            { field: "nome", header: "Nome" },
            { field: "descricao", header: "Descricao" },
            { field: "descricaoCategoria", header: "Categoria" },
            { field: "acoes", header: "Ações" },
        ];
    }

    public getCompetencias() {
        this.competenciaService.getCompetencias().subscribe(
            (data) => {
                this.competencias = data;
                console.log(this.competencias);
            },
            (error) => {
                console.log("Erro", error);
            }
        );
    }

    public editarCompetencia(competencia: CompetenciaModel) {
        this.competenciaEditada = competencia;
        this.showDialog(true);
    }

    public excluirCompetencia(id: number) {
        this.competenciaService.deleteCompetencia(id).subscribe(
            (result) => {
                this.getCompetencias();
                console.log("Resultado: ", result);
                this.messageService.add({
                    severity: "success",
                    summary: "Confirmação",
                    detail: "Competência excluída com sucesso!",
                });
            },
            (error) => {
                console.log("Erro: ", error);
                this.messageService.add({
                    severity: "error",
                    summary: "Erro na exclusão da competência",
                    detail: error.error.ERRORS,
                });
            }
        );
    }

    confirmarExclusao(id: number) {
        this.confirmationService.confirm({
            message: "Você deseja continuar com o processo?",
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.excluirCompetencia(id);
            },
        });
    }
}
