import { shift } from './shift';
import { Taille } from './Taille';
import { Zone } from './Zone';

export class Tarif {
   id : number ;
   price: number;
   zone : Zone;
   taille: Taille;
   shift: shift
}