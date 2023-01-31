import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Facture } from '../model/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  addFactureUrl :string;
  getAllFacturesUrl:string;
  deleteFactureUrl:string;
  updateFactureUrl:string;
  getIdClientUrl:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     
    })
  };
  
  constructor(private http:HttpClient) { 
    this.addFactureUrl="http://localhost:8089/Stage/facture/add-facture";
    this.getAllFacturesUrl="http://localhost:8089/Stage/facture/fetch-factures"
    this.deleteFactureUrl="http://localhost:8089/Stage/facture/delete-facture/"
    this.updateFactureUrl="http://localhost:8089/Stage/facture/updateFacture/"
    this.getIdClientUrl="http://localhost:8089/Stage/facture/getClientId/"

  }
  addFacture(fac:Facture,idClient:number,idFournisseur:number):Observable<Facture>{
    return this.http.post<Facture>(this.addFactureUrl+"/"+idClient+"/"+idFournisseur,fac);
  }
  getAllFactures():Observable<Facture[]>{
    return this.http.get<Facture[]>(this.getAllFacturesUrl);
  }
  deleteFacture(fac:Facture):Observable<Facture>{
     return this.http.delete<Facture>(this.deleteFactureUrl+fac.idFacture);
  }
  updateFacture(fac:Facture):Observable<Facture>{
    //console.log(fac)
    return this.http.put<Facture>(this.updateFactureUrl,fac,this.httpOptions);
  }
  getClientId(idF:number):Observable<number>{
    return this.http.get<number>(this.getIdClientUrl+idF);

  }
  
}
/*package tn.esprit.spring.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration 
{
    @Bean
    public WebMvcConfigurer corsConfigurer() 
    {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:4200");
            }
        };
    }
  }
    **/

