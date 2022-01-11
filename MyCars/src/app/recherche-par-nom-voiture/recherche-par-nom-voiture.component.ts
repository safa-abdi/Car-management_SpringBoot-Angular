import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque';
import { Voiture } from '../model/voitures';
import { MarqueService } from '../services/marque.service';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-recherche-par-nom-voiture',
  templateUrl: './recherche-par-nom-voiture.component.html',
  styles: [],
})
export class RechercheParNomVoitureComponent implements OnInit {
  marques: Marque[];
  voitures: Voiture[];
  voituresRecherche: Voiture[];
  idvoiture: number;
  designation: string;

  constructor(
    private voitureService: VoitureService,
    private marqueService: MarqueService
  ) {}

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
  rechercherParNomVoiture(designation: string): Voiture[] {
    this.voituresRecherche = [];
    this.voitures.forEach((cur, index) => {
      if (designation == cur.designation) {
        console.log('cur ' + cur);
        this.voituresRecherche.push(cur);
      }
    });
    return this.voituresRecherche;
  }
  onChange() {
    this.voitures = this.rechercherParNomVoiture(this.designation);
  }
}
