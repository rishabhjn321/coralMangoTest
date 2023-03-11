import { createContext, useReducer } from 'react';
import React from 'react';

export type LayoutProps = {
  children: React.ReactNode;
};

type initialStateT = {
  role?: string;
};

export const defaultState: initialStateT = {
  role:
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userRole')) === null
      ? 'admin'
      : typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userRole')) !== 'admin'
      ? 'customer'
      : 'admin',
};

export const loginRoleContext = createContext<{
  roleState: typeof defaultState;
  dispatch: React.Dispatch<any>;
}>({
  roleState: defaultState,
  dispatch: () => null,
});

const contextreducer = (roleState: typeof defaultState, action: any): typeof defaultState => {
  switch (action.type) {
    case 'SET_ROLE_CUSTOMER':
      return {
        ...roleState,
        role: 'customer',
      };
    case 'SET_ROLE_ADMIN':
      return {
        ...roleState,
        role: 'admin',
      };
    default:
      return defaultState;
  }
};

const LoginRoleProvider: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [roleState, dispatch] = useReducer(contextreducer, defaultState);

  return (
    <loginRoleContext.Provider
      value={{
        roleState,
        dispatch,
      }}
    >
      {children || null}
    </loginRoleContext.Provider>
  );
};

export default LoginRoleProvider;
