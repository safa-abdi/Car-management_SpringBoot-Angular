import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voitures';
import { VoitureService } from '../services/voiture.service';
import { Router } from '@angular/router';
import { MarqueService } from '../services/marque.service';
import { Marque } from '../model/marque';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ImageCService } from '../services/Image.service';
import { ImageC } from '../model/image';

@Component({
  selector: 'app-add-voitures',
  templateUrl: './add-voitures.component.html',
  styleUrls: ['./add-voitures.component.css'],
})
export class AddVoituresComponent implements OnInit {
  voitures: Voiture[];
  newVoiture = new Voiture();
  message: string;
  marques: any;
  marqueList!: Marque[];
  image: ImageC;
  voiture: Voiture;
  constructor(
    private voitureService: VoitureService,
    private marqueService: MarqueService,
    private router: Router,
    private ImageService: ImageCService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.marqueService.listeMarques().subscribe((mqs: any) => {
      console.log(mqs);
      this.marques = mqs;
    });
    this.voitureService.listeVoitures().subscribe((voits: any) => {
      console.log(voits);
      this.voitures = voits;
    });
  }

  addVoiture(addForm: NgForm): void {
    document.getElementById('add-voiture-form')?.click();
    const values = addForm.value;
    let voiture = {
      idVoiture: values.idVoiture,
      designation: values.designation,
      dateCreation: values.dateCreation,
      prixVoiture: values.prixVoiture,
      couleurs: values.couleurs,
      disponibilite: values.disponibilite,
      marque: {
        idmarque: values.marque,
      },
    };
    this.voitureService
      .ajouterVoiture(voiture)
      .subscribe((response: Voiture) => {
        addForm.reset();
        this.ngOnInit();
        console.log(response);
        this.router.navigate(['voitures']);
      });
  }

  onSelectmarq() {
    this.marqueService.listeMarques().subscribe((response) => {
      console.log(response);
      this.marqueList = response;
    });
    this.voitureService.listeVoitures().subscribe((response) => {
      console.log(response);
      this.voitures = response;
    });
  }
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message2: string;
  imageName: any;
  idVoiture: number;
  selectedFile: File;

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image

  onUpload3(): void {
    const uploadImageData = new FormData();
    uploadImageData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name
    );
    this.idVoiture = 1;
    console.log(this.voiture.idVoiture);
    this.ImageService.ajouterImage(this.idVoiture, uploadImageData).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
  onUpload() {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name
    );
    console.log(this.idVoiture);
    //Make a call to the Spring Boot Application to save the image
    this.httpClient
      .post(
        'http://localhost:8086/image/upload3/' + this.idVoiture,
        uploadImageData,
        {
          observe: 'response',
        }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.message2 = 'Image uploaded successfully';
        } else {
          this.message2 = 'Image not uploaded successfully';
        }
      });
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient
      .get('http://localhost:8086/image/get/' + this.imageName)
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
  }
}
