export interface IPost {
  id?: string;
  title: string;
  price: number;
  authorId: string;
  author?: string;
  createdAt?: string;
  categoryId: string;
  banner: string;
  description: string;
  phone: string;
  whatsapp?: string;
  photos: string[];
}
