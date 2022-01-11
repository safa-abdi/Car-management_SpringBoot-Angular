import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque';
import { Voiture } from '../model/voitures';
import { MarqueService } from '../services/marque.service';
import { VoitureService } from '../services/voiture.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: [],
})
export class RechercheParMarqueComponent implements OnInit {
  apiURL: string = 'http://localhost:8086/voitures/api';
  voitures: Voiture[];
  idmarque: number;
  marques: Marque[];
  voituresRecherche: Voiture[];

  constructor(
    private voitureService: VoitureService,
    private marqueService: MarqueService,
    private http: HttpClient
  ) {}
  supprimerVoiture(id: number) {
    //supprimer le produit  du tableau produits d'une maniere locale
    /*const index = this.voitures.indexOf(voit, 0);
    if (index > -1) {
      this.voitures.splice(index, 1);
    }
    */
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  ngOnInit(): void {
    this.marqueService.listeMarques().subscribe((mqs: Marque[]) => {
      console.log(mqs);
      this.marques = mqs;
    });
    this.voitureService.listeVoitures().subscribe((voits: Voiture[]) => {
      console.log(voits);
      this.voitures = voits;
    });
  }
  rechercherParMarque(idmarque: number): Voiture[] {
    this.voituresRecherche = [];
    this.voitures.forEach((cur, index) => {
      if (idmarque == cur.marque.idmarque) {
        console.log('cur ' + cur);
        this.voituresRecherche.push(cur);
      }
    });
    return this.voituresRecherche;
  }

  onChange() {
    console.log(this.idmarque);
    this.voitures = this.rechercherParMarque(this.idmarque);
  }
}
