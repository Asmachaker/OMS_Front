import { Client } from "./Client";
import { Tarif } from "./Tarif";

export class Booking{
  id: BigInt;
  client: Client;
  tarif: Tarif;
  pickupCode: string  ;
  deliveryCode :string ;
  trackingCode :String ;
  statut:String;
  numCommande: BigInt ;
  date: Date;
  idBox: BigInt;
  colone: String;
  StationName: String;
  idStation:  BigInt;
}
