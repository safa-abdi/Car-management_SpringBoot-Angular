import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voitures';
import { VoitureService } from '../services/voiture.service';
import { Router } from '@angular/router';
import { MarqueService } from '../services/marque.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ImageCService } from '../services/Image.service';
import { ImageC } from '../model/image';

@Component({
  selector: 'app-add-voitures',
  templateUrl: './rechercheImage.component.html',
})
export class rechercheImageComponent implements OnInit {
  voitures: Voiture[];
  images: ImageC[];
  newVoiture = new Voiture();
  message: string;
  voiture: Voiture;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  retrievedImage1: any;
  base64Data1: any;
  retrieveResonse1: any;
  message2: string;
  imageName: any;
  id: number;
  idVoiture: number;
  selectedFile: File;
  constructor(
    private voitureService: VoitureService,
    private marqueService: MarqueService,
    private router: Router,
    private ImageService: ImageCService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.voitureService.listeVoitures().subscribe((voits: any) => {
      console.log(voits);
      this.voitures = voits;
    });
    this.ImageService.listeImages().subscribe((imgs: any) => {
      console.log(imgs);
      this.images = imgs;
    });
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    console.log(this.imageName);
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient
      .get('http://localhost:8086/image/nom/get/' + this.imageName)
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
  }

  getImageById() {
    this.httpClient
      .get('http://localhost:8086/image/idV/get/' + this.idVoiture)
      .subscribe((res) => {
        this.retrieveResonse1 = res;
        this.base64Data1 = this.retrieveResonse1.picByte;
        this.retrievedImage1 = 'data:image/jpeg;base64,' + this.base64Data1;
        console.log(res);
      });
  }
  supprimerImage() {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) console.log(this.id);
    this.ImageService.supprimerImage(this.id).subscribe(() => {
      console.log('image supprimé');
      this.SuprimerImageDuTableau();
    });
  }
  SuprimerImageDuTableau() {
    this.images.forEach((cur, index) => {
      if (this.id === cur.id) {
        this.images.splice(index, 1);
      }
    });
  }
}
