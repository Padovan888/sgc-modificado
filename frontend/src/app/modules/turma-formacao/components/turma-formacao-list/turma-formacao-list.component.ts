import { CompetenciaColaboradorModel } from "./../../models/competencia-colaborador.model";
import { TurmaFormacaoService } from "./../../services/turma-formacao.service";
import { TurmaFormacaoModel } from "./../../models/turma-formacao.model";
import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng";

@Component({
    selector: "app-turma-formacao-list",
    templateUrl: "./turma-formacao-list.component.html",
    styleUrls: ["./turma-formacao-list.component.css"],
})
export class TurmaFormacaoListComponent implements OnInit {
    cols: any[];
    turmasFormacao: TurmaFormacaoModel[];
    display: boolean = false;
    turmaFormacaoEditada: TurmaFormacaoModel;
    isVisualizar: boolean = false;

    constructor(
        private turmaFormacaoService: TurmaFormacaoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.getTurmaFormacao();
        this.columns();
    }

    public columns() {
        this.cols = [
            { field: "nome", header: "Nome" },
            { field: "dataInicio", header: "Data de Início" },
            { field: "dataTermino", header: "Data de Término" },
            { field: "descricaoStatus", header: "Status" },
            { field: "acoes", header: "Ações" },
        ];
    }

    public getTurmaFormacao() {
        this.turmaFormacaoService.getTurmaFormacao().subscribe(
            (data) => {
                this.turmasFormacao = data;
            },
            (error) => {
                console.log("Erro", error);
            }
        );
    }

    public editarTurmaFormacao(turmaFormacao: TurmaFormacaoModel) {
        turmaFormacao.dataInicio = new Date(turmaFormacao.dataInicio);
        turmaFormacao.dataTermino = new Date(turmaFormacao.dataTermino);
        this.turmaFormacaoEditada = turmaFormacao;
        this.showDialog(true);
    }

    public excluirTurmaFormacao(id: number) {
        this.turmaFormacaoService.deleteTurmaFormacao(id).subscribe(
            () => {
                this.showMessageSuccess(), this.getTurmaFormacao();
            },
            () => {
                this.showMessageError();
            }
        );
    }

    showMessageSuccess() {
        this.messageService.add({
            severity: "success",
            summary: "Turma de formação excluída com sucesso!",
            detail: "",
        });
    }
    showMessageError() {
        this.messageService.add({
            severity: "error",
            summary: "Falha ao excluir turma de formação",
            detail: "Verifique se há colaboradores vinculados",
        });
    }

    public atualizarTurmasFormacao(event) {
        this.getTurmaFormacao();
    }

    public showDialog(edit: boolean) {
        this.display = true;
        this.turmaFormacaoEditada = edit
            ? this.turmaFormacaoEditada
            : undefined;
    }

    confirmarExclusaoTurmaFormacao(id: number) {
        this.confirmationService.confirm({
            message: "Você deseja continuar com o processo?",
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.excluirTurmaFormacao(id);
            },
        });
    }
}
