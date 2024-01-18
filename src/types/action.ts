import {IState} from 'types/state';
import {IUser} from 'types/user';

export type Action = {
  getUserProfile: (user: IState['user']) => void;
  updatePhoto: (photo: IUser['photo']) => void;
  updateProfile: (user: IState['user']) => void;
  signOut: () => void;
  changeCategory: (category: IState['category']) => void;
};
