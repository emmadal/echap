import {IUser} from 'types/user';

export type Action = {
  getUserProfile: (user: IUser) => void;
  updatePhoto: (photo: string) => void;
  updateProfile: (user: IUser) => void;
  signOut: () => void;
  changeCategory: (categoryId: string) => void;
};
