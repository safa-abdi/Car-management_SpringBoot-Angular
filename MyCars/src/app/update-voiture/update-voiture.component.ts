import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MarqueService } from '../services/marque.service';
import { Voiture } from '../model/voitures';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-update-voiture',
  templateUrl: './update-voiture.component.html',
  styles: [],
})
export class UpdateVoitureComponent implements OnInit {
  currentVoiture = new Voiture();
  marques: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private voitureService: VoitureService,
    private marqueService: MarqueService,
    private router: Router
  ) {}
  ngOnInit() {
    /*
    this.currentVoiture = this.voitureService.consulterVoiture(this.activatedRoute.snapshot.params.id);
    console.log(this.consulterVoiture);
    */
    this.marqueService.listeMarques().subscribe((mqs: any) => {
      console.log(mqs);
      this.marques = mqs;
    });
    this.voitureService
      .consulterVoiture(this.activatedRoute.snapshot.params['id'])
      .subscribe((voit) => {
        this.currentVoiture = voit;
      });
  }
  updateVoiture(updateForm: NgForm) {
    document.getElementById('update-voiture-form')?.click();
    const values = updateForm.value;
    this.currentVoiture.marque = {
      idmarque: values.marque,
    };
    this.voitureService.updateVoiture(this.currentVoiture).subscribe(
      (response: Voiture) => {
        updateForm.reset();
        this.ngOnInit();
        this.router.navigate(['voitures']);
      },
      (error) => {
        alert('Problème lors de la modification !');
      }
    );
  }
}
