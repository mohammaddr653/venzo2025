export interface PropertyvalsObj {
  value: string;
  price?: number;
  stock?: number;
}
export interface PropertiesObj {
  name: string;
  values: PropertyvalsObj[];
}
