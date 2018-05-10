export interface Product {
    _id: string;
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
