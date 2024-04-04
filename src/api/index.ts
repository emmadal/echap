import * as Keychain from 'react-native-keychain';
import url from './url.json';
import {ICategory} from 'types/category';
import {IPost} from 'types/post';
import {IResponse} from 'types/response';

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

export const getOTP = async () => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(url.otp, {
      method: 'GET',
      headers: {
        Authorization: (token && token?.password) as string,
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to request code');
  }
};

export const verificationOTP = async (code: string) => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(url.verification, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (token && token?.password) as string,
      },
      body: JSON.stringify({code}),
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to verify code');
  }
};

export const getArticles = async (category_id: number): Promise<IPost[]> => {
  const token = await Keychain.getGenericPassword();
  const req = await fetch(`${url.article}/${category_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: (token && token?.password) as string,
    },
  });
  const response = await req.json();
  return response?.data || [];
};

export const uploadFile = async (file: FormData): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${url.upload}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: (token && token?.password) as string,
      },
      body: file,
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to upload file');
  }
};

export const createArticle = async (data: IPost): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${url.new_article}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (token && token?.password) as string,
      },
      body: JSON.stringify({...data}),
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to create article');
  }
};
