export interface PropertyvalsObj {
  value?: string;
  valueString: string;
  hex?: string;
  price?: string;
  stock?: string;
}
export interface PropertiesObj {
  name: string;
  nameString: string;
  selective: boolean;
  specifiedVals: boolean;
  type: string;
  values: PropertyvalsObj[];
}
