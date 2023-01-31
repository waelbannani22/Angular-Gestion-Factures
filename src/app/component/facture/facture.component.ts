import { JsonPipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from 'src/app/model/client';
import { Facture } from 'src/app/model/facture';
import { Fournisseur } from 'src/app/model/fournisseur';
import { ClientService } from 'src/app/service/client.service';
import { FactureService } from 'src/app/service/facture.service';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  

  closeModel() {

  }

  detailFacture !: FormGroup;
  facture: Facture = new Facture();
  facturesList:Facture[]=[];
  facturesListModified:Facture[]=[];
  listCient:Client[]=[];
  listFournisseurs:Fournisseur[]=[]
  idClientSelected:number=0;
  chosenObj:any
  client :Client=new Client();
  clientDetails!:FormGroup;
  listofIds:number[]=[]
  

  constructor(private formBuilder: FormBuilder, private detailService: FactureService
    ,private clientService :ClientService,private fournisseurService:FournisseurService,
    private toastService:ToastrService) { }
  ngOnInit(): void {
   
    this.getAllCLient()
    this.getAllFactures()
    this.getAllFournisseurs()
    
    this.detailFacture = this.formBuilder.group({
      idFacture:[],
      montantFacture: [0,[Validators.requiredTrue]],
      dateCreation: [,[Validators.pattern]],
      idClient:[0, [ Validators.required ] ],
      idFournisseur:[null,[Validators.requiredTrue]]
      
    });
   // this.detailFacture.controls['idFacture'].disable()
   

  }
  
  addFacture1() {

    console.log(this.detailFacture.value.idClient)
    this.facture.dateCreation = this.detailFacture.value.dateCreation;
    this.facture.montantFacture = this.detailFacture.value.montantFacture;
    this.idClientSelected=this.detailFacture.value.idClient
    console.log(this.facture)
    this.detailService.addFacture(this.facture,this.idClientSelected,this.detailFacture.value.idFournisseur).subscribe(res => {
      console.log(res);
      this.toastService.success('facture ajoutée :)','',{
        timeOut:1500
      });
      this.getAllFactures();
    }, err => {
      console.log(err);
    })

  }
  getAllCLient(){

    this.clientService.getAllFactures().subscribe(res=>{
     // console.log(res)
      this.listCient=res;
    },err=>{
      console.log("failed to fetch client")
    })
  }
  getAllFournisseurs(){

    this.fournisseurService.getAllFournisseurs().subscribe(res=>{
     // console.log(res)
      this.listFournisseurs=res;
    },err=>{
      console.log("failed to fetch client")
    })
  }
  getClientId(idF:number){
    
    this.detailService.getClientId(idF).subscribe(res=>{
       console.log(res)
   },err=>{
     console.log("error while finding client id")
   })

 }
 
  getAllFactures(){
    this.getClientId.call(this,25)
    
    this.detailService.getAllFactures().subscribe(res=>{
     // this.getClientId(25)
       res.forEach((k)=>{
              this.detailService.getClientId(k.idFacture).subscribe(res=>{
                this.listofIds.push(res)
                console.log(this.listofIds)
            },err=>{
              console.log("error while finding client id")
            })
       });
       console.log("fulllist"+this.listofIds)
     
       
        res.forEach((e)=>{
          console.log(this.getClientId(e.idFacture))
          e.idClient =Number(this.getClientId(e.idFacture)) 
          this.facturesListModified.push(e)
     });
     console.log(this.facturesListModified)
     this.facturesList=res
    // console.log(this.facturesList)
    },err=>{
      console.log("failed to fetch")
    })
  }
  //lil affichage
  editFacture(fac:Facture){
      //console.log("heeee"+fac )

      this.detailFacture.controls['idFacture'].setValue(fac.idFacture);
      this.detailFacture.controls['dateCreation'].setValue(fac.dateCreation);
      this.detailFacture.controls['montantFacture'].setValue(fac.montantFacture);
      this.detailFacture.controls['idClient'].setValue(fac.idClient)
      console.log(this.detailFacture.value)


  }
  deleteFacture(fac:Facture) {
    console.log(fac.idFacture)
    this.detailService.deleteFacture(fac).subscribe(res=>{
      console.log("deleted succefully")
      this.toastService.warning('facture supprimée :)','',{
        timeOut:1500
      });
      this.getAllFactures();
    },err=>{
      console.log("failed to delete")
    })
    
  }
  //for the real update
  updateFacture(){
    
    console.log(this.detailFacture.value)
    
    this.detailService.updateFacture(this.detailFacture.value).subscribe(res=>{
       console.log("updated :°) ")
     //  this.toastService.success("updated successfully")
        this.getAllFactures();
    },err=>{
        console.log("failed to update")
    })

  }
  


}
