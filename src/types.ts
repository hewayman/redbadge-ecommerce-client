
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addressLn1: string;
  addressLn2: string;
  city: string;
  state: string;
  zipcode: number;
  phone: number | null;
}

export type Users = User[]


interface Thing {
  id: number;
}

export interface Product extends Thing {
  
}

export interface Item extends Thing {
  imgURL: string;
  itemName: string;
  count: number;
  price: number;
}