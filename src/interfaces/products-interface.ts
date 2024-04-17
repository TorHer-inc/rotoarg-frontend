export interface ProductData {
  products : Product[];
}

export interface Product {
  id       : string;
  name     : string;
  capacity : number;
  height   : number;
  diameter : number;
  price    : number;
}