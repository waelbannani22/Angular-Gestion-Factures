import { Client } from "./client";

export class Facture {
    idFacture!:number
    montantFacture!:number;
    dateCreation!:Date;
    idClient!:number;
    idFournisseur!:number;
}
