import {ICategory} from 'types/category';
import url from './url.json';

export const getCategories = async (): Promise<ICategory[]> => {
  const req = await fetch(url.categories, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await req.json();
  return response?.data;
};

export const login = async (phone: string) => {
  const req = await fetch(url.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({phone}),
  });
  const response = await req.json();
  return response;
};
