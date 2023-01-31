import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fournisseur } from 'src/app/model/fournisseur';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  detailFournisseur!:FormGroup;
  fournisseur : Fournisseur = new Fournisseur();
  listFournisseurs:Fournisseur[]=[]
  
  constructor(private FormBuilder:FormBuilder,private fournisseurService :FournisseurService
    ,private toast :ToastrService){}
  ngOnInit(): void {

    this.fetchFournisseurs()
      this.detailFournisseur =this.FormBuilder.group({
        idFournisseur:[],
        libelle:[],
        categourieFournisseur:[]
      });
      //this.detailFournisseur.controls['idFournisseur'].disable();
    
  }


    fetchFournisseurs(){
      this.fournisseurService.getAllFournisseurs().subscribe(res=>{
        this.listFournisseurs=res
      },err=>{
          console.log(err)
      })
    }
    updateFournisseurs() {
      this.fournisseurService.updateFournisseur(this.detailFournisseur.value).subscribe(res=>{
        this.fetchFournisseurs()
        this.toast.info('fournisseur modifiée :)','',{
          timeOut:1500
        });
      },err=>{
        console.log(err)
      })
      
    }
    deleteFournisseur(four: Fournisseur) {
      this.fournisseurService.deleteFournisseur(four).subscribe(res=>{
          this.fetchFournisseurs()
          this.toast.warning('fournisseur supprimé :)','',{
            timeOut:1500
          });
      },err=>{
          console.log(err)
      })
    }
    editFournisseur(four: Fournisseur) {
        this.detailFournisseur.controls['idFournisseur'].setValue(four.idFournisseur)
        this.detailFournisseur.controls['libelle'].setValue(four.libelle)
        this.detailFournisseur.controls['categourieFournisseur'].setValue(four.categourieFournisseur)
    }
    addFournisseur() {
      
      this.fournisseur.libelle = this.detailFournisseur.value.libelle
      this.fournisseur.categourieFournisseur=this.detailFournisseur.value.categourieFournisseur
      this.fournisseurService.addFournisseur(this.fournisseur).subscribe(res=>{
          //
          this.fetchFournisseurs();
          this.toast.success('fournisseur ajouté :)','',{
            timeOut:1500
          });

      },err=>{
          //
          console.log(err)
      })

    }

}
