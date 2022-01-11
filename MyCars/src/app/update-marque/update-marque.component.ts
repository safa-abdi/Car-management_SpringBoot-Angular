import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarqueService } from '../services/marque.service';
import { Marque } from '../model/marque';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-marque',
  templateUrl: './update-marque.component.html',
  styleUrls: ['./update-marque.component.css'],
})
export class UpdateMarqueComponent implements OnInit {
  currentMarque = new Marque();

  constructor(
    private activatedRoute: ActivatedRoute,
    private marqueService: MarqueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.marqueService
      .consulterMarque(this.activatedRoute.snapshot.params['id'])
      .subscribe((mq) => {
        this.currentMarque = mq;
      });
  }
  updateMarque() {
    this.marqueService.updateMarque(this.currentMarque).subscribe(
      () => {
        this.router.navigate(['marques']);
      },
      (error) => {
        alert('Problème lors de la modification !');
      }
    );
  }
}
