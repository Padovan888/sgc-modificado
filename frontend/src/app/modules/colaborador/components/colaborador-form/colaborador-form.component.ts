import { TurmaFormacaoService } from "./../../../turma-formacao/services/turma-formacao.service";
import { CompetenciaColaboradorModel } from "./../../../turma-formacao/models/competencia-colaborador.model";
import { Validacoes } from "./../../models/Validacoes.model";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { Observable } from "rxjs";
import { CategoriaModel } from "src/app/modules/competencia/models/categoria.model";
import { CompetenciaService } from "src/app/modules/competencia/services/competencia.service";

import { ColaboradorService } from "../../services/colaborador.service";
import { CompetenciaModel } from "./../../../competencia/models/competencia.model";
import { ColaboradorModel } from "./../../models/colaborador.model";
import { CompetenciaNivel } from "./../../models/competencia-nivel.model";
import { SenioridadeService } from "./../../services/senioridade.service";

@Component({
    selector: "app-colaborador-form",
    templateUrl: "./colaborador-form.component.html",
    styleUrls: ["./colaborador-form.component.css"],
})
export class ColaboradorFormComponent implements OnInit {
    colabForm: FormGroup;
    formAdicao: FormGroup;

    nivel: CategoriaModel[] = [];
    competencia: CompetenciaModel[] = [];
    opcoesCompetencia: SelectItem[];
    competenciaSelecionada: CompetenciaModel;
    nivelSelecionado: CategoriaModel;
    senioridadeSelecionada: CategoriaModel;
    titleModal = true;
    competenciaColaborador: CompetenciaColaboradorModel[] = [];
    competenciaColaboradorBoolean: Boolean;

    public isVisualizar: boolean = true;

    @Input() display = false;
    @Input() colaboradorEditado: ColaboradorModel;
    @Output() aoFechar = new EventEmitter();
    @Output() refreshColaboradores = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private rest: CompetenciaService,
        private restColab: ColaboradorService,
        private senioridadeService: SenioridadeService,
        public activatedRouter: ActivatedRoute,
        private messageService: MessageService,
        private turmaFormacaoService: TurmaFormacaoService
    ) {
        this.opcoesCompetencia = [];
    }

    ngOnInit(): void {
        this.getCompetencia();
        this.getNivel();

        this.colabForm = this.fb.group({
            id: [null],
            nome: [
                "",
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(255),
                ],
            ],
            sobrenome: [
                "",
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(255),
                ],
            ],
            cpf: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            dataNascimento: ["", [Validators.required]],
            dataAdmissao: ["", [Validators.required]],
            idSenioridade: ["", [Validators.required]],
            competenciasList: [[], [Validators.required]],
        });
        if (!!this.colaboradorEditado) {
            this.titleModal = false;
            this.colabForm.patchValue(this.colaboradorEditado);
        }
    }

    verificaId() {
        if (!this.colabForm.get("id").value) {
            this.createColaborador();
            return;
        }
        this.updateColaborador();
    }

    createColaborador() {
        this.finalizarRequisicao(
            this.restColab.postColaborador(this.colabForm.getRawValue()),
            this.showMessageCriar()
        );
    }

    updateColaborador() {
        this.finalizarRequisicao(
            this.restColab.putColaborador(this.colabForm.getRawValue()),
            this.showMessageEditar()
        );
    }

    finalizarRequisicao(
        observable: Observable<ColaboradorModel>,
        mensagemSucesso
    ) {
        observable.subscribe(
            (result) => {
                this.refreshColaboradores.emit();
                mensagemSucesso;
                console.log("teste: ");
                this.fecharModal();
            },
            (error) => console.log("testeErro: ", error)
        );
    }

    showMessageEditar() {
        this.messageService.add({
            severity: "success",
            summary: "Colaborador editado com sucesso!",
            detail: "",
        });
    }
    showMessageCriar() {
        this.messageService.add({
            severity: "success",
            summary: "Coloborador criado com sucesso!",
            detail: "",
        });
    }

    public getCompetencia() {
        this.rest.getCompetencias().subscribe(
            (data) => {
                this.competencia = data;
            },
            (error) => {
                console.log("Erro", error);
            }
        );
    }

    public getNivel() {
        this.senioridadeService.getSenioridade().subscribe(
            (data) => {
                this.nivel = data;
            },
            (error) => {
                console.log("Erro", error);
            }
        );
    }

    converterParaDropDown(n: any[], valor: string, nome: string): SelectItem[] {
        return n.map((item: any) => ({
            value: valor ? item[valor] : item,
            label: item[nome],
        }));
    }

    fecharModal() {
        this.display = false;
        this.aoFechar.emit();
    }

    addCompetencia() {
        const campoCompetenciasList: CompetenciaNivel[] =
            this.colabForm.get("competenciasList").value;
        const idCompSelecionada = this.competenciaSelecionada.id;
        const idNivelSelecionado = this.nivelSelecionado.id;
        const compNivel: CompetenciaNivel = new CompetenciaNivel(
            idCompSelecionada,
            idNivelSelecionado
        );
        if (this.competenciaIncluida(campoCompetenciasList, compNivel)) {
            return alert("Essa competência já foi adicionada");
        }
        campoCompetenciasList.push(compNivel);
        console.log(campoCompetenciasList);
    }

    removerCompetencia(idComp: number): void {
        const campoCompetenciasList: CompetenciaNivel[] =
            this.colabForm.get("competenciasList").value;

        const index = campoCompetenciasList.findIndex(
            ({ idCompetencia }) => idCompetencia === idComp
        );
        campoCompetenciasList.splice(index, 1);
    }

    verificarPossibilidadeRemocaoCompetencia(
        idColaborador: number,
        idCompetencia: number
    ) {
        let competenciaColaborador: CompetenciaColaboradorModel[] = [];
    }

    competenciaIncluida(campoCompetenciasList, compNivel): boolean {
        return campoCompetenciasList
            .map(
                (compNivelIncluido: CompetenciaNivel) =>
                    compNivelIncluido.idCompetencia
            )
            .includes(compNivel.idCompetencia);
    }

    gerarNomeCompetencia(competenciaNivelModel: CompetenciaNivel) {
        const descricaoCompetencia = this.competencia.find(
            (competencia: CompetenciaModel) => {
                return competencia.id === competenciaNivelModel.idCompetencia;
            }
        );
        const descricaoNivel = this.nivel.find((nivel: CategoriaModel) => {
            return nivel.id === competenciaNivelModel.nivel;
        });

        return descricaoCompetencia.nome + " = " + descricaoNivel.descricao;
    }

    get title() {
        return this.titleModal ? "Novo Colaborador" : "Editar Colaborador";
    }

    get titleButton() {
        return this.titleModal ? "Criar" : "Editar";
    }

    verificaValidacao(campo) {
        return (
            this.colabForm.get(campo).valid && this.colabForm.get(campo).touched
        );
    }

    erroCss(campo) {
        return {
            "has-error": this.verificaValidacao(campo),
            "has-feedback": this.verificaValidacao(campo),
        };
    }

    verificarVinculoColaboradorCompetenciaTurma(
        idColaborador: number,
        idCompetencia: number
    ) {
        this.turmaFormacaoService
            .verificaVinculoColaboradorCompetenciaTurma(
                idColaborador,
                idCompetencia
            )
            .subscribe(
                (data) => {
                    this.competenciaColaboradorBoolean = data;
                    console.log("Boolean: ", data);
                    if (this.competenciaColaboradorBoolean) {
                        this.messageService.add({
                            severity: "error",
                            summary:
                                "Não foi possível remover essa competência",
                            detail: "O colaborador está lecionando essa competência em uma Turma de Formação",
                        });
                        return;
                    }
                    this.removerCompetencia(idCompetencia);
                },
                (error) => {
                    console.error("Erro: ", error);
                }
            );
    }
}
