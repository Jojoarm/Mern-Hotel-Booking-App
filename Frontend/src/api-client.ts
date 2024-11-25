import { LoginFormData } from './pages/Login';
import { RegisterFormData } from './pages/Signup';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

//create user
export const createUser = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

//login user
export const userLogin = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

//validate token
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Token invalid');
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
    credentials: 'include',
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Error during signout');
  }
};
