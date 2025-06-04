export interface PropertyvalsObj {
  valueString: string;
  price?: number;
  stock?: number;
}
export interface PropertiesObj {
  nameString: string;
  selective: boolean;
  values: PropertyvalsObj[];
}
