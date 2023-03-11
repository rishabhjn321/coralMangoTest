import axios from 'axios';
import { createContext, useCallback, useEffect, useReducer } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/router';

export type LayoutProps = {
  children: React.ReactNode;
};

type initialStateT = {
  records?: any;
  userDetail?: any;
  isAuthenticated?: boolean;
  token?: string;
  role?: string;
  loading?: boolean;
};

export const defaultState: initialStateT = {
  userDetail: {},
  isAuthenticated: false,
  token: '',
  role: '',
  loading: false,
  records: {},
};

export const AppContext = createContext<{
  state: typeof defaultState;
  dispatch: React.Dispatch<any>;
  action: any;
}>({
  state: defaultState,
  dispatch: () => null,
  action: () => null,
});

const contextreducer = (state: typeof defaultState, action: any): typeof defaultState => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };

    case 'SUCCESS':
      return {
        ...state,
        userDetail: { ...state.userDetail, ...action.data },
        token: action.data.token,
        role: action.data.role,
        loading: false,
        isAuthenticated: true,
        records: action?.data,
      };
    case 'FAILURE':
      return { ...state, loading: false };
    case 'CLEAR_STATE':
      return { ...defaultState };
    case 'SET_USER_INFO':
      return {
        ...state,
        userDetail: { ...state.userDetail, ...action.data },
        token: action.data.token,
        role: action.data.role,
        loading: false,
        isAuthenticated: true,
      };
    default:
      return defaultState;
  }
};

const LoginProvider: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [state, dispatch] = useReducer(contextreducer, defaultState);

  const login = useCallback(async (values, adminLogin) => {
    dispatch({ type: 'LOADING' });

    // const newRole = adminLogin === 'customer' ? 'contacts' : 'employees';

    try {
      // const forAPI = { email: values.email, password: values.password };
      // const response = await axios.post('https://logideck.onrender.com/v1/employees/login', forAPI);
      // const response = await axios.post(
      //   `https://logideck.onrender.com/v1/${newRole}/login`,
      //   forAPI,
      // );

      // const { role, token } = response.data.data;

      // localStorage.setItem('userData', JSON.stringify(response.data.data));
      // localStorage.setItem('userRole', JSON.stringify(response?.data?.data?.role));

      const user = JSON.parse(localStorage.getItem('userData'));
      if (user && user.role && user.token) {
        dispatch({ type: 'SUCCESS', data: user });
        if (values.remember_me === true) {
          localStorage.setItem('Username', values.email);
          localStorage.setItem('password', values.password);

        }
        router.push('/admin/dashboard');

      }
      values.email = '';
      values.password = '';
      // toast.success(response.data.message);
    } catch (error) {
      toast.error('Invalid credentials.');
      dispatch({ type: 'FAILURE' });
      console.log(error);
      values.email = '';
      values.password = '';
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.role && userData.token) {
      dispatch({ type: 'SET_USER_INFO', data: userData });
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        action: { login },
      }}
    >
      {children || null}
    </AppContext.Provider>
  );
};

export default LoginProvider;
