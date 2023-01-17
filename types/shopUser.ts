// internal data types
type ShopingItemType = {
  title: string;
  price: number;
  currency: string;
  date: string;
};

interface INodeElement {
  firsName: string;
  lastName: string;
  age: number;
  birthDate: string;
  shoppingItemsList?: ShopingItemType[];
}

export type Chat = {
  title: string;
  nodesList: INodeElement[];
};

// external data types
type Timestamp = {
  seconds: number;
  nanos: number;
};

export type ExtShopingItemType = {
  Title: string;
  Price: number;
  Currency: string;
  Date: Timestamp;
};

export interface IExtNodeElement {
  FirsName: string;
  LastName: string;
  Age: number;
  BirthDate: Timestamp;
  ShoppingItems: ExtShopingItemType[];
}

export type ExtChat = {
  Title: string;
  ChatItems: IExtNodeElement[];
};
