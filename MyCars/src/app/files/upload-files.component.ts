import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voitures';
import { VoitureService } from '../services/voiture.service';
import { Router } from '@angular/router';
import { MarqueService } from '../services/marque.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ImageCService } from '../services/Image.service';

@Component({
  selector: 'app-add-voitures',
  templateUrl: './upload-files.component.html',
})
export class FilesComponent implements OnInit {
  voitures: Voiture[];
  newVoiture = new Voiture();
  message: string;
  voiture: Voiture;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message2: string;
  imageName: any;
  idVoiture: number;
  selectedFile: File;
  constructor(
    private voitureService: VoitureService,
    private router: Router,
    private ImageService: ImageCService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.voitureService.listeVoitures().subscribe((voits: any) => {
      console.log(voits);
      this.voitures = voits;
    });
  }

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
    this.router.navigate(['voitures']);
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
