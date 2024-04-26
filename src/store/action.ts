import {IUser} from 'types/user';

export type Action = {
  updatePhoto: (photo: string) => void;
  updateProfile: (user: IUser) => void;
  signOut: () => void;
  changeCategory: (category: number) => void;
};
