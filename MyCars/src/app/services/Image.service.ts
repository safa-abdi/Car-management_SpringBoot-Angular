import { Injectable } from '@angular/core';
import { Voiture } from '../model/voitures';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marque } from '../model/marque';
import { AuthService } from './auth.service';
import { ImageC } from '../model/image';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ImageCService {
  apiURL: string = 'http://localhost:8086/image/upload3';
  voiture = new Voiture();
  image = new Image();

  constructor(private http: HttpClient, private authService: AuthService) {}
  listeImages(): Observable<ImageC[]> {
    const url = `http://localhost:8086/image`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<ImageC[]>(url + '/allI', {
      headers: httpHeaders,
    });
  }
  ajouterImage(id: number, image: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<ImageC>(this.apiURL, id, image);
  }
  supprimerImage(id1: number) {
    //supprimer le produit  du tableau produits d'une maniere locale
    /*const index = this.voitures.indexOf(voit, 0);
    if (index > -1) {
      this.voitures.splice(index, 1);
    }
    */
    const url = `http://localhost:8086/image/${id1}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }
}
