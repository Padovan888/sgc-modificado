import { PaginaInicialModule } from './modules/pagina-inicial/pagina-inicial.module';
import { TurmaFormacaoModule } from './modules/turma-formacao/turma-formacao.module';
import { ColaboradorModule } from './modules/colaborador/colaborador.module';
import { CompetenciaModule } from './modules/competencia/competencia.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { LoginSuccessComponent } from '@nuvem/angular-base';

const routes: Routes = [
    { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros' } },
    { path: 'login-success', component: LoginSuccessComponent },
    { path: 'competencia', loadChildren: () => CompetenciaModule },
    { path: 'colaborador', loadChildren: () => ColaboradorModule },
    { path: 'turma', loadChildren: () => TurmaFormacaoModule },
    { path: 'home', loadChildren: () => PaginaInicialModule }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
