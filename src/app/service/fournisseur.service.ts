import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { Fournisseur } from '../model/fournisseur';
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  getAllFournisseursUrl:string;
  addFournisseursUrl:string;
  deleteFournisseursUrl:string;
  updateFournisseursUrl:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     
    })
  };

  constructor(private http:HttpClient) {
    this.addFournisseursUrl="http://localhost:8089/Stage/fournisseur/add-fournisseur"
    this.getAllFournisseursUrl="http://localhost:8089/Stage/fournisseur/retrieve-all-fournisseurs"
    this.deleteFournisseursUrl="http://localhost:8089/Stage/fournisseur/delete-fournisseur/"
    this.updateFournisseursUrl="http://localhost:8089/Stage/fournisseur/update-fournisseur/"
   }

   getAllFournisseurs():Observable<Fournisseur[]>{
      return this.http.get<Fournisseur[]>(this.getAllFournisseursUrl);
   }
   addFournisseur(four:Fournisseur):Observable<Fournisseur>{
    return this.http.post<Fournisseur>(this.addFournisseursUrl,four);

   }

   deleteFournisseur(four:Fournisseur):Observable<Fournisseur>{
    return this.http.delete<Fournisseur>(this.deleteFournisseursUrl+four.idFournisseur) 

   }
   updateFournisseur(four:Fournisseur):Observable<Fournisseur>{
    return this.http.post<Fournisseur>(this.updateFournisseursUrl,four,this.httpOptions)
   }
}
