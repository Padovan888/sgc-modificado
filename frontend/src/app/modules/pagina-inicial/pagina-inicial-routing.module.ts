import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BemVindoComponent } from './components/bem-vindo/bem-vindo.component';

const routes: Routes = [
    {
        path: '', component: BemVindoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaginaInicialRoutingModule { }
