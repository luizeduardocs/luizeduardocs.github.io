import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampanhasRoutingModule } from './campanhas-routing.module';
import { CampanhasComponent } from './campanhas.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    CampanhasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    NgbTabsetModule,
    CurrencyMaskModule,
  ],
  declarations: [
    CampanhasComponent,
  ]
})
export class CampanhasModule { }
