import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase{
  id: number;
  sellRent: number;
  name: string;
  pType: string;
  bedrooms: number;
  fType: string;
  price: number;
  builtArea: number;
  CarpetArea?: number;
  Address: string;
  Address2?: string;
  city: string;
  FloorNo?: string;
  TotalFloor?: string;
  RTM: number;
  AOP?: string;
  MainEntrance?: string;
  Security?: number;
  Gated?: number;
  Maintenance?: number;
  Possession?: string;
  Image?: string;
  Description?: string;
  PostedOn: string;
  PostedBy: number;
}
