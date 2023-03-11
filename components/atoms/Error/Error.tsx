import React from 'react';
import { Text } from '../Text/Text';
import { LocaleString } from '../locales/en';
import { ErrorMessage } from 'formik';

interface ErrorProps {
  text: LocaleString;
}
export const Error = ({ text }: ErrorProps) => {
  // console.log('called');
  return <Text className="text-red-600 mt-1 text-xs" id={text} />;
};
export const FormikError = ({ name }: { name: string }) => {
  // console.log('error', name);
  return (
    <ErrorMessage name={name}>
      {(error) => {
        // console.log(error, 'inside error');
        return <Error text={error as LocaleString} />;
      }}
    </ErrorMessage>
  );
};
