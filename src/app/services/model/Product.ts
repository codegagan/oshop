export interface Product {
    title: string;
    price: number;
    category: Category;
    imageUrl: string;
}

enum Category {
    bread,
    dairy,
    vegetables,
    fruits,
    seasonings
}
