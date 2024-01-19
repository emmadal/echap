import {IState} from 'types/state';

export const initialState: IState = {
  user: {
    name: '',
    city: '',
    phone: '',
    premium: false,
    bio: '',
    email: '',
    photo: '',
    whatsapp: '',
    jwt: '',
  },
  category: '1',
  logout: true,
};