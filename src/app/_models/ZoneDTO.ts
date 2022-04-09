export class ZoneDTO {
    codePostal: string;
    id: number;
    name: string; 
   
}

export const ZoneSchema = {
    isSelected: "isSelected",
    name: "text",
    id:"text",
    code:"number",
    isEdit: "isEdit"
  }