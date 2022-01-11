import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voitures';
import { VoitureService } from '../services/voiture.service';
import { Router } from '@angular/router';
import { MarqueService } from '../services/marque.service';
import { Marque } from '../model/marque';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css'],
})
export class VoituresComponent implements OnInit {
  voitures: Voiture[];
  marques: Marque[];
  constructor(
    private httpClient: HttpClient,
    private voitureService: VoitureService,
    private marqueService: MarqueService,
    public authService: AuthService,
    private router: Router
  ) {}
  supprimerVoiture(v: Voiture) {
    /*
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.voitureService.supprimerVoiture(voit);
      */
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.voitureService.supprimerVoiture(v.idVoiture).subscribe(() => {
        console.log('voiture supprimé');
        this.SuprimerVoitureDuTableau(v);
      });
  }
  SuprimerVoitureDuTableau(voit: Voiture) {
    this.voitures.forEach((cur, index) => {
      if (voit.idVoiture === cur.idVoiture) {
        this.voitures.splice(index, 1);
      }
    });
  }
  ngOnInit(): void {
    this.voitureService.listeVoitures().subscribe((voits) => {
      console.log(voits);
      this.voitures = voits;
    });
  }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  idVoiture: any;
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name
    );
    //Make a call to the Spring Boot Application to save the image
    this.httpClient
      .post('http://localhost:8086/image/upload', uploadImageData, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      });
  }
}
