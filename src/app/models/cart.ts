import { Product } from './product';
export class Cart {
    items?: CartItem[];
}

export class CartItem {
    productId? : string;
    quantity?: number
}


export class CartProduct {
    product? : any;
    quantity?: number
}

