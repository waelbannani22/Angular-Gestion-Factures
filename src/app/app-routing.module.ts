import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './component/client/client.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FactureComponent } from './component/facture/facture.component';
import { FournisseurComponent } from './component/fournisseur/fournisseur.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'factures', component: FactureComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'fournisseurs', component: FournisseurComponent },
  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
