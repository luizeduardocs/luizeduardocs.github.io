import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TblBorderRoutingModule } from './tbl-border-routing.module';
import { TblBorderComponent } from './tbl-border.component';

@NgModule({
  declarations: [TblBorderComponent],
  imports: [
    CommonModule,
    TblBorderRoutingModule,
  ]
})
export class TblBorderModule { }
