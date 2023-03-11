import { createContext, useCallback, useReducer } from 'react';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { LayoutProps } from '../../context/loginContext';

type initialStateT = {
  loading?: boolean;
  page?: number;
  isAddLoading?: boolean;
};

const initialState: initialStateT = {
  page: 1,
  loading: false,
  isAddLoading: false,
};

export const DashboardContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
  action: any;
}>({
  state: initialState,
  dispatch: () => null,
  action: () => null,
});

const contextreducer = (state: typeof initialState, action: any): typeof initialState => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'FAILURE':
      return { ...state, loading: false };
    case 'ADD_LOADING':
      return { ...state, isAddLoading: true };
    case 'ADD_SUCCESS':
      return { ...state, isAddLoading: false };
    case 'ADD_FAILURE':
      return { ...state, isAddLoading: false };
    default:
      return initialState;
  }
};

const DashboardContentProvider: React.FC = ({ children }: LayoutProps) => {
  const [state, dispatch] = useReducer(contextreducer, initialState);

  const getTotalCount = useCallback(async (token?: string) => {
    dispatch({ type: 'LOADING' });
    if (token) {
      try {
        const response = await fetch(`https://coralmango.com/api/react-test`, {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        });
        const res = await response.json();
        const resData = res?.data;
        dispatch({ type: 'TOTAL_SUCCESS', data: resData });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        state,
        dispatch,
        action: {
          getTotalCount,
        },
      }}
    >
      {children || null}
    </DashboardContext.Provider>
  );
};

export default DashboardContentProvider;
