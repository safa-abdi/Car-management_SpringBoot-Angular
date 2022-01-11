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
export class VoitureService {
  apiURL: string = 'http://localhost:8086/api';
  URL: string = 'http://localhost:8086/api/vt';
  voitures: Voiture[];
  marques: Marque[];
  voiture = new Voiture();
  marque = new Marque();
  image = new ImageC();
  voituresRecherche: Voiture[];
  /*voitures: Voiture[]; //un tableau de Voitures*/
  constructor(private http: HttpClient, private authService: AuthService) {}
  listeVoitures(): Observable<Voiture[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Voiture[]>(this.apiURL + '/all', {
      headers: httpHeaders,
    });
  }
  ajouterVoiture(voit: Voiture): Observable<Voiture> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Voiture>(this.apiURL, voit, { headers: httpHeaders });
  }
  supprimerVoiture(id: number) {
    //supprimer le produit  du tableau produits d'une maniere locale
    /*const index = this.voitures.indexOf(voit, 0);
    if (index > -1) {
      this.voitures.splice(index, 1);
    }
    */
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }
  consulterVoiture(id: number): Observable<Voiture> {
    /*
    this.voiture = this.voitures.find((v) => v.idVoiture == id);
    return this.voiture;
    */
    const url = `${this.apiURL}/vt/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Voiture>(url, { headers: httpHeaders });
  }
  updateVoiture(voit: Voiture): Observable<Voiture> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Voiture>(this.apiURL, voit, { headers: httpHeaders });
  }
  updatedataWithImage(id: number, value: any) {
    return this.http.put(`${this.apiURL + '/updateImage'}/${id}`, value);
  }
  trierVoitures() {
    this.voitures = this.voitures.sort((n1, n2) => {
      if (n1.idVoiture > n2.idVoiture) {
        return 1;
      }
      if (n1.idVoiture < n2.idVoiture) {
        return -1;
      }
      return 0;
    });
  }
}
