import {IState} from 'types/state';

export const initialState: IState = {
  user: {
    name: '',
    city_id: 0,
    country_id: 0,
    phone: '',
    premium: false,
    biography: '',
    photo: '',
    whatsapp: '',
    tiktok: '',
    instagram: '',
  },
  category: 0,
  logout: true,
};
