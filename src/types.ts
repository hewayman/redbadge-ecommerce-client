export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addressLn1: string;
  addressLn2: string;
  city: string;
  state: string;
  zipcode: number | null;
  phone: number | null;
}

export type Users = User[]


interface Thing {
  id: number;
}

export interface Product extends Thing {
  
}

export interface StoreItem extends Thing {
  itemName: string;
  color: string;
  description: string;
  price: number;
  itemNum: number;
  imgURL: string;
  count: number;
}

// export interface Cart {

// }

// export interface UpdateToken {
//   newToken: string;
//   updateId: string;
//   updateAdmin: boolean;
//   updateFirstName: string;
//   updateUser: User;
// }