

export interface Product {
    id: number | null,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: { rate: string, count: string }
}

