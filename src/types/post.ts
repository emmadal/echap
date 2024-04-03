export interface IPost {
  id?: number;
  title: string;
  price: number;
  author_id: number;
  category_id: number;
  country_id: number;
  city_id: number;
  banner: string;
  description: string;
  phone: string;
  photos: string[];
  created_at?: string;
}
