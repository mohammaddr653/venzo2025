export interface PropertyvalsObj {
  value: string;
  price?: number;
  stock?: number;
}
export interface PropertiesObj {
  name: string;
  selective: "true" | "false";
  values: PropertyvalsObj[];
}
