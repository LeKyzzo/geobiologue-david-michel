export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  ritual?: string;
  price: number | null;
}
