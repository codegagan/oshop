import { Product } from './Product';

export interface ShoppingCart {
    _id: string;
    creationTime: number;
    items: CartItem[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}
