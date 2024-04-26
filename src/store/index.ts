import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IState} from 'types/state';
import {initialState} from './state';
import {Action} from './action';

export const useStore = create(
  persist<IState & Action>(
    set => ({
      ...initialState,
      updatePhoto: photo => set(state => ({user: {...state.user, photo}})),
      updateProfile: user =>
        set(state => ({
          ...state,
          user: {...state.user, ...user},
          logout: false,
        })),
      changeCategory: category => set(state => ({...state, category})),
      signOut: () => set(initialState),
    }),
    {
      name: 'oblack_storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
