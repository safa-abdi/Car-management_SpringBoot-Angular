import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque';
import { MarqueService } from '../services/marque.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.css'],
})
export class AddMarqueComponent implements OnInit {
  newMarque = new Marque();
  message: string;
  constructor(private marqueService: MarqueService, private router: Router) {}
  ngOnInit(): void {}
  addMarque() {
    this.marqueService
      .ajouterMarque(this.newMarque)
      .subscribe((response: Marque) => {
        this.ngOnInit();
        console.log(response);
        this.router.navigate(['marques']);
      });
  }
}
