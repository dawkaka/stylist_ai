export interface WardrobeItem {
    id: string;
    image: string;
    name: string;
    color: string;
    brand: string;
    size: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};


export interface Clothing extends Omit<WardrobeItem, "createdAt" | "updatedAt"> {
    id: string
}

export interface PaginatedResult {
    items: WardrobeItem[];
    nextFetch: number
    isEnd: boolean
};
