import { discountObj } from "./discountObj";

export interface Property {
  _id?: string; //اگر از قبل ساخته شده باشد آیدی دارد
  name: string;
  specifiedVals: Boolean;
  type: string;
}

export interface PropertyvalsObj {
  value?: string;
  valueString: string;
  hex?: string;
  price?: string;
  discount?: discountObj;
  stock?: string;
}
export interface ProductPropertiesObj {
  property: Property;
  selective: boolean;
  values: PropertyvalsObj[];
}
