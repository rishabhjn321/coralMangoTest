import React from 'react';
import HeaderSiderLayout from '../../molecules/HeaderSiderLayout';

export const Layout = ({ children }: any) => {
  return (
    <>
      <HeaderSiderLayout/>
      {children}
    </>
  );
};

