import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque';
import { MarqueService } from '../services/marque.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.css'],
})
export class MarquesComponent implements OnInit {
  marques: Marque[];

  constructor(
    private marqueService: MarqueService,
    private router: Router,
    public authService: AuthService
  ) {}
  supprimerMarque(m: Marque) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.marqueService.supprimerMarque(m.idmarque!).subscribe(() => {
        console.log('marque supprimé');
        this.SuprimerMarqueDuTableau(m);
      });
  }

  SuprimerMarqueDuTableau(mq: Marque) {
    this.marques.forEach((cur, index) => {
      if (mq.idmarque === cur.idmarque) {
        this.marques.splice(index, 1);
      }
    });
  }
  ngOnInit(): void {
    this.marqueService.listeMarques().subscribe((mqs) => {
      console.log(mqs);
      this.marques = mqs;
    });
  }
}
