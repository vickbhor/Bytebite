export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}