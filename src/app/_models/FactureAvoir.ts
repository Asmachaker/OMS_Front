import { Bordereau } from "./Bordereau";
import { Client } from "./Client";

export class FactureAvoir{
      id: BigInt;
      client:  Client ;
      date: Date;
      name: string;
      statut: boolean;
      amount:number ;
      bordereau: Bordereau;
}