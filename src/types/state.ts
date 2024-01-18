import {IUser} from 'types/user';

export interface IState {
  user: IUser;
  logout: boolean;
  category: string;
}
