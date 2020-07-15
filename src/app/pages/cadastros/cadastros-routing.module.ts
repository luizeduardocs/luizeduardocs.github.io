import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClustersComponent } from './clusters/clusters.component';
import { CortesiasComponent } from './cortesias/cortesias.component';
import { MccComponent } from './mcc/mcc.component';
import { MoedasComponent } from './moedas/moedas.component';
import { PacotesBeneficiosComponent } from './pacotes-beneficios/pacotes-beneficios.component';
import { ValoresPontosComponent } from './valores-pontos/valores-pontos.component';
import { ValidadesPontosComponent } from './validades-pontos/validades-pontos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'clusters',
        component: ClustersComponent,
      },
      {
        path: 'cortesias',
        component: CortesiasComponent,
      },
      {
        path: 'mcc',
        component: MccComponent,
      },
      {
        path: 'moedas',
        component: MoedasComponent,
      },
      {
        path: 'pacotes-beneficios',
        component: PacotesBeneficiosComponent,
      },
      {
        path: 'valores-pontos',
        component: ValoresPontosComponent,
      },
      {
        path: 'validades-pontos',
        component: ValidadesPontosComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
