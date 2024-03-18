import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialState} from 'state';
import {Action} from 'types/action';
import {IState} from 'types/state';

export const useStore = create(
  persist<IState & Action>(
    set => ({
      ...initialState,
      getUserProfile: user =>
        set(state => ({
          ...state,
          user: {...state.user, ...user},
          logout: false,
        })),
      updatePhoto: photo => set(state => ({user: {...state.user, photo}})),
      updateProfile: user => set(state => ({user: {...state.user, ...user}})),
      changeCategory: category => set(state => ({...state, category})),
      signOut: () => set(initialState),
    }),
    {
      name: 'oblack_storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
