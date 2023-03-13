import { createContext, useCallback, useReducer } from 'react';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { LayoutProps } from '../../context/loginContext';

type initialStateT = {
  loading?: boolean;
  page?: number;
  totalData?: any;
  totalMember?: number;
};

const initialState: initialStateT = {
  page: 1,
  loading: false,
  totalData: [],
  totalMember: 0,
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

    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        totalData: action?.data,
        totalMember: action?.data?.length,
      };

    default:
      return initialState;
  }
};

const DashboardContentProvider: React.FC = ({ children }: LayoutProps) => {
  const [state, dispatch] = useReducer(contextreducer, initialState);

  const getTotalCount = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(`https://coralmango.com/api/react-test`, {
        method: 'GET',
        headers: new Headers({
          // Authorization: `Bearer ${token}`,
        }),
      });
      const res = await response.json();

      dispatch({ type: 'SUCCESS', data: res });
    } catch (error) {
      console.log(error);
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
