import { Booking } from "./booking";
import { Client } from "./Client";

export class Bordereau{
  id: BigInt;
  client: Client;
  date: Date;
  booking: Booking [];
}
