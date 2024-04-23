import * as Keychain from 'react-native-keychain';
import {IPost} from 'types/post';
import {IResponse} from 'types/response';
import {API_URL} from '@env';
import {IUser} from 'types/user';

export const getCategories = async (): Promise<IResponse> => {
  try {
    const req = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to fetch categories');
  }
};

export const login = async (phone: string) => {
  try {
    const req = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone}),
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to connect user');
  }
};

export const register = async (data: any): Promise<IResponse> => {
  try {
    const req = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data}),
    });
    const response = await req.json();
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getOTP = async () => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${API_URL}/otp`, {
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
    const req = await fetch(`${API_URL}/otp-verification`, {
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

export const getArticles = async (category_id: number): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${API_URL}/articles/${category_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (token && token?.password) as string,
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to fetch articles');
  }
};

export const uploadFile = async (file: FormData): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${API_URL}/upload`, {
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
    const req = await fetch(`${API_URL}/article`, {
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

export const updateUserProfile = async (
  data: IUser,
  id: number,
): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${API_URL}/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (token && token?.password) as string,
      },
      body: JSON.stringify({...data}),
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to update user profile');
  }
};

export const getUserDetails = async (id: number): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${API_URL}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (token && token?.password) as string,
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to fetch user profile');
  }
};

export const getCitiesByCountry = async (
  countryID: number,
): Promise<IResponse> => {
  try {
    const req = await fetch(`${API_URL}/city/${countryID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to fetch cities');
  }
};

export const getCountries = async (): Promise<IResponse> => {
  try {
    const req = await fetch(`${API_URL}/countries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to fetch countries');
  }
};

export const getArticlesByUser = async (userId: number, offset: number) => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(
      `${API_URL}/articles/owner?user=${userId}&page=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (token && token?.password) as string,
        },
      },
    );
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to fetch articles');
  }
};

export const deleteArticle = async (articleId: number): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${API_URL}/article/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (token && token?.password) as string,
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    throw new Error('Unable to delete the article');
  }
};

export const reportIssues = async (data: any): Promise<IResponse> => {
  try {
    const token = await Keychain.getGenericPassword();
    const req = await fetch(`${API_URL}/report-issues`, {
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
    throw new Error('Unable to report your issues');
  }
};
