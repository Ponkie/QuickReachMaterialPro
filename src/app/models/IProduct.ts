export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    action?: string;
    productCategories?: ProductCategory[];
}

interface ProductCategory {
    category: any;
    categoryID: number;
    productID: number
}