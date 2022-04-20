import { Booking } from "./booking";
import { Client } from "./Client";
import { Tarif } from "./Tarif";

export class Bordereau{
  id: BigInt;
  client: Client;
  date: Date;
  Booking: Booking[];
}
