export interface Product {
    title: string;
    price: number;
    category: Category;
    url: string;
}

enum Category {
    bread,
    dairy,
    vegetables,
    fruits,
    seasonings
}
