import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountPage } from './account.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AccountPageRoutingModule } from './account-routing.module';
import { PhoneNumberPipe } from '../phone-number.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AccountPageRoutingModule,
    PhoneNumberPipe
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
