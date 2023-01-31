import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{



  submitted = false;
  //detailClient !: FormGroup;

  detailClient: FormGroup = new FormGroup({
    idClient: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
   
  });
  
  client : Client = new Client();
  listClient:Client[]=[]
  constructor(private formBuilder : FormBuilder,private clientService:ClientService,private toastr: ToastrService){}
  
  ngOnInit(): void {

    this.fetchClients()

    this.detailClient = this.formBuilder.group({
      idClient:[''],
      nom:[
        '',
        [Validators.required]
      ],
      prenom:[
        '',
        [Validators.required]
      ],
      email:[
        '',
        [Validators.required, Validators.email]
      ]

    });
    //this.detailClient.controls['idClient'].disable()

   }
   get f(): { [key: string]: AbstractControl } {
    return this.detailClient.controls;
  }
  onReset() {
    this.submitted = false;
    this.detailClient.reset();
}
   //add client
   //data-bs-dismiss="modal"
  addClient() {
    this.submitted=true
    this.client.nom=this.detailClient.value.nom
    this.client.prenom=this.detailClient.value.prenom
    this.client.email=this.detailClient.value.email
    if(this.detailClient.invalid){
      return;
    }
    this.clientService.addClient(this.client)
      .subscribe(res=>{
       
        this.toastr.success('client ajouté :)','',{
          timeOut:1500
        });
        this.fetchClients()
      },err=>{
        console.log(err)
      })
    
  }
  //fetch clients
  fetchClients(){
    this.clientService.getAllFactures().subscribe(res=>{
      // console.log(res)
      //this.toastr.show("all clients are fetched")
       this.listClient=res;
     },err=>{
       console.log("failed to fetch client")
     })
  }
  //update client
  updateClient() {
    this.clientService.updateCLient(this.detailClient.value)
      .subscribe(res=>{
        this.toastr.success("client updated")
        this.toastr.show("the list is newly updated ")
        this.fetchClients()
       
      },err=>{
        console.log(err)
      })
  }
  //edit pour affichage
  editClient(client: Client) {
    this.detailClient.controls['idClient'].setValue(client.idClient)
    this.detailClient.controls['nom'].setValue(client.nom)
    this.detailClient.controls['prenom'].setValue(client.prenom)
    this.detailClient.controls['email'].setValue(client.email)

  }
  //delete client
  deleteClient(client: Client) {
    this.clientService.deleteClient(client)
      .subscribe(res=>{
        this.fetchClients()
        this.toastr.error('client deleted','', {
          timeOut: 1500,
        });
      }, err=>{
          console.log(err)
      })
  }


}
