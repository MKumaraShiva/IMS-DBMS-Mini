export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface Order {
    id: number;
    user: User;  // Instead of userId
    product: Product;  // Instead of productId
    quantity: number;
}
