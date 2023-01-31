import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { FactureComponent } from './component/facture/facture.component';
import { ClientComponent } from './component/client/client.component';
import { FournisseurComponent } from './component/fournisseur/fournisseur.component';
import { DashboardComponent } from './component/dashboard/dashboard.component'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    FactureComponent,
    ClientComponent,
    FournisseurComponent,
    DashboardComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    /*
    RouterModule.forRoot([
      { path: 'factures', component: FactureComponent },
      { path: 'clients', component: ClientComponent },
    ])
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
