import {IState} from 'types/state';

export const initialState: IState = {
  user: {
    name: '',
    city_id: 0,
    country_id: 0,
    phone: '',
    premium: false,
    is_active: false,
    role: false,
    biography: '',
    photo: '',
    whatsapp: '',
    tiktok: '',
    instagram: '',
  },
  category: 1,
  logout: true,
};
