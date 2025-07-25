import { PropertiesObj } from "./propertiesObj";

export interface NewProductFormData {
  name: string;
  price: string;
  discount: string;
  stock: string;
  categoryId: string;
  description: string;
  properties: PropertiesObj[];
  img: string;
}
