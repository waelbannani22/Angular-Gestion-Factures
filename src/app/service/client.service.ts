import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Client } from '../model/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getAllClientUrl:string;
  addClientUrl:string;
  deleteClientUrl:string;
  updateClientUrl:string
  constructor(private http:HttpClient) {
    this.getAllClientUrl="http://localhost:8089/Stage/client/retrieve-all-clients"
    this.addClientUrl="http://localhost:8089/Stage/client/add-client"
    this.deleteClientUrl="http://localhost:8089/Stage/client/delete-client/"
    this.updateClientUrl="http://localhost:8089/Stage/client/update-client"
  }

  getAllFactures():Observable<Client[]>{
    return this.http.get<Client[]>(this.getAllClientUrl);
  }
  addClient(client:Client):Observable<Client>{
    return this.http.post<Client>(this.addClientUrl,client);
  }
  deleteClient(client:Client):Observable<Client>{
    return this.http.delete<Client>(this.deleteClientUrl+client.idClient)
  }
  updateCLient(client:Client):Observable<Client>{
    return this.http.put<Client>(this.updateClientUrl,client)
  }

}
