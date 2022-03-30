import { PaginaInicialRoutingModule } from './pagina-inicial-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BemVindoComponent } from './components/bem-vindo/bem-vindo.component';



@NgModule({
    declarations: [BemVindoComponent],
    imports: [
        CommonModule,
        SharedModule,
        PaginaInicialRoutingModule
    ]
})
export class PaginaInicialModule { }
