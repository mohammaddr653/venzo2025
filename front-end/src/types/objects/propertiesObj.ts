export interface PropertyvalsObj {
  value?: string;
  valueString: string;
  hex?: string;
  price?: number;
  stock?: number;
}
export interface PropertiesObj {
  name: string;
  nameString: string;
  selective: boolean;
  specifiedVals: boolean;
  type: string;
  values: PropertyvalsObj[];
}
