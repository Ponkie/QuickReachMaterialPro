export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    action?: string;
    categories: ProductCategory[];
}

interface ProductCategory {
    id: number;
    name: string;
}