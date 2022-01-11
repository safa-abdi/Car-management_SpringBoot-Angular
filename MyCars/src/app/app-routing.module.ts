import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VoituresComponent } from './voitures/voitures.component';
import { MarquesComponent } from './marques/marques.component';
import { AddVoituresComponent } from './add-voitures/add-voitures.component';
import { AddMarqueComponent } from './add-marque/add-marque.component';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';
import { UpdateMarqueComponent } from './update-marque/update-marque.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RechercheParNomVoitureComponent } from './recherche-par-nom-voiture/recherche-par-nom-voiture.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VoitureGuard } from './voiture.guard';
import { FilesComponent } from './files/upload-files.component';
import { rechercheImageComponent } from './recherche-Images/rechercheImage';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'voitures', component: VoituresComponent },
  { path: 'marques', component: MarquesComponent },
  { path: 'add-Images', component: FilesComponent },
  { path: 'cherche-Images', component: rechercheImageComponent },

  {
    path: 'add-voitures',
    component: AddVoituresComponent,
  },
  { path: 'add-marques', component: AddMarqueComponent },
  { path: '', redirectTo: 'voitures', pathMatch: 'full' },
  {
    path: 'updateVoiture/:id',
    component: UpdateVoitureComponent,
  },
  { path: 'rechercheParMarque', component: RechercheParMarqueComponent },
  {
    path: 'add-produit',
    component: AddVoituresComponent,
    canActivate: [VoitureGuard],
  },
  {
    path: 'rechercheParNomVoiture',
    component: RechercheParNomVoitureComponent,
  },
  { path: 'updateMarque/:id', component: UpdateMarqueComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export class ViewsModule {}
