import router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { ContentLayout } from '../../atoms/ContentLayout';

export const DashboardContent = () => {
  const logoutButton = () => {
    // if () {
    // localStorage.removeItem('userData'), dispatch({ type: 'CLEAR_STATE' }), route.push('/');
    localStorage?.removeItem('Username'), localStorage?.removeItem('password'), router?.push('/');

    toast.success('Successfully logged out');
  };
  // }
  // } catch (error) {
  //   toast.error('Something went wrong Try again');
  //   console.log(error);
  // }
  return (
    <>
      <ContentLayout>
        <div>
          hhhh
          <button onClick={() => logoutButton()}>hello</button>
        </div>
      </ContentLayout>
    </>
  );
};
