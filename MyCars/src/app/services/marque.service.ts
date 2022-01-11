import { Injectable } from '@angular/core';
import { Marque } from '../model/marque';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class MarqueService {
  apiURL: string = 'http://localhost:8086/Mapi';
  constructor(private http: HttpClient, private authService: AuthService) {}
  listeMarques(): Observable<Marque[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Marque[]>(this.apiURL + '/all', {
      headers: httpHeaders,
    });
  }
  ajouterMarque(mqs: Marque): Observable<Marque> {
    /*this.voitures.push(voit);*/
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Marque>(this.apiURL, mqs, { headers: httpHeaders });
  }
  supprimerMarque(id: number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }
  consulterMarque(id: number): Observable<Marque> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Marque>(url, { headers: httpHeaders });
  }
  updateMarque(mq: Marque): Observable<Marque> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Marque>(this.apiURL, mq, { headers: httpHeaders });
  }
}
