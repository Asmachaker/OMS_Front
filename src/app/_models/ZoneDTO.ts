export class ZoneDTO {
   
    id: string;
    name: string; 
    code: number;
}

export const ZoneSchema = {
    isSelected: "isSelected",
    name: "text",
    id:"text",
    code:"number",
    isEdit: "isEdit"
  }