export type IUser = {
  id?: number;
  name: string;
  biography?: string;
  premium: boolean;
  phone: string;
  is_active: boolean;
  role: boolean;
  country_id: number;
  city_id: number;
  photo?: string;
  whatsapp?: string;
  tiktok?: string;
  instagram?: string;
};

export type RegisterType = Pick<IUser, 'name' | 'phone'>;
