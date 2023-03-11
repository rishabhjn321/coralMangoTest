import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { AppContext } from './loginContext';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

export const LogoutContext = createContext(null);

const LogoutProvider: React.FC = ({ children }: any) => {
  const { dispatch } = useContext(AppContext);
  const route = useRouter();

  const logout = async (token) => {
    if (token) {
      try {
        const response = await axios.post(
          // 'https://logideck.onrender.com/v1/contacts/logout',
          'https://logideck.onrender.com/v1/employees/logout',

          { title: '' },
          {
            headers: { Authorization: 'Bearer ' + token },
          },
        );
        if (response) {
          localStorage.removeItem('userData'), dispatch({ type: 'CLEAR_STATE' }), route.push('/');
          toast.success('Successfully logged out');
        }
      } catch (error) {
        toast.error('Something went wrong Try again');
        console.log(error);
      }
    }
  };

  return (
    <LogoutContext.Provider
      value={{
        logout,
      }}
    >
      {children || null}
    </LogoutContext.Provider>
  );
};

export default LogoutProvider;
