import React from 'react';
import { IntlProvider } from 'react-intl';
import { en } from './en';

function LanguageProvider({ children }: any) {
  return (
    <IntlProvider locale="en" messages={en}>
      {children}
    </IntlProvider>
  );
}
export default LanguageProvider;
