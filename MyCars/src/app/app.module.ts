import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoituresComponent } from './voitures/voitures.component';
import { AddVoituresComponent } from './add-voitures/add-voitures.component';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';
import { HttpClientModule } from '@angular/common/http';
import { MarquesComponent } from './marques/marques.component';
import { AddMarqueComponent } from './add-marque/add-marque.component';
import { UpdateMarqueComponent } from './update-marque/update-marque.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomVoitureComponent } from './recherche-par-nom-voiture/recherche-par-nom-voiture.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FilesComponent } from './files/upload-files.component';
import { rechercheImageComponent } from './recherche-Images/rechercheImage';

@NgModule({
  declarations: [
    AppComponent,
    VoituresComponent,
    AddVoituresComponent,
    UpdateVoitureComponent,
    MarquesComponent,
    AddMarqueComponent,
    UpdateMarqueComponent,
    RechercheParMarqueComponent,
    RechercheParNomVoitureComponent,
    LoginComponent,
    ForbiddenComponent,
    FilesComponent,
    rechercheImageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
