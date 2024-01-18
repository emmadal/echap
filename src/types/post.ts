export interface IPost {
  id?: string;
  title: string;
  price: number;
  authorId: string;
  categoryId: string;
  banner: string;
  description: string;
  phone: string;
  whatsapp?: string;
  photos: string[];
}
