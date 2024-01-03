export interface Signup {
    name: string;
    password: string;
    email: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface AddProduct {
    name : string;
    price : number;
    color: string;
    category: string;
    description: string;
    image: string;
    id: number;
    quantity: undefined | number;
    productId: undefined | number;
}

export interface UserSignup {
    name: string;
    password: string;
    email: string;
}

export interface Cart {
    name : string;
    price : number;
    color: string;
    category: string;
    description: string;
    image: string;
    id: undefined | number;
    quantity: undefined | number;
    userId: number;
    productId: number;
}

export interface PriceSummary {
    price: number;
    tax: number;
    delivery: number;
    discount: number;
    total: number;
}

export interface OrderNow {
    name: string;
    email: string;
    address: string;
    mobile: string;
}

export interface OrderData {
    totalAmount: number;
    userId: any;
    name: string;
    email: string;
    address: string;
    mobile: string;
    id: number | undefined;
}