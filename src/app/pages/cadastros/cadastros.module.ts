import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClustersComponent } from './clusters/clusters.component';
import { CortesiasComponent } from './cortesias/cortesias.component';
import { MccComponent } from './mcc/mcc.component';
import { MoedasComponent } from './moedas/moedas.component';
import { PacotesBeneficiosComponent } from './pacotes-beneficios/pacotes-beneficios.component';

import { CadastrosRoutingModule } from './cadastros-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ValoresPontosComponent } from './valores-pontos/valores-pontos.component';
import { ValidadesPontosComponent } from './validades-pontos/validades-pontos.component';

@NgModule({
  declarations: [
      ClustersComponent,
      CortesiasComponent,
      MccComponent,
      MoedasComponent,
      PacotesBeneficiosComponent,
      ValoresPontosComponent,
      ValidadesPontosComponent,

  ],
  imports: [
    CommonModule,
    CadastrosRoutingModule,
    SharedModule,
    CurrencyMaskModule,
  ]
})
export class CadastrosModule { }
