import React, { useRef } from 'react';
import { Form, Formik } from 'formik';
import FormikInput from '../FormikInput';
import { formatName } from '../../settings/constant';

type FormikSearchBarT = {
  placeholderText?: string;
  searchQuery?: string;
  setSearchQuery?: (e) => void;
};

export const FormikSearchBar = ({
  placeholderText,
  searchQuery,
  setSearchQuery,
}: FormikSearchBarT) => {
  const Debounce = 1000;

  const timeoutHandler = useRef(null);

  const handleChange = (event) => {
    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current);
    }
    timeoutHandler.current = setTimeout(() => {
      setSearchQuery(event?.target?.value);
    }, Debounce);
  };

  return (
    <Formik
      enableReinitialize={true}
      onSubmit={(search) => {
        // setSearchQuery(search);
      }}
      initialValues={{ search: searchQuery }}
    >
      {({ values: { search }, setFieldValue }) => (
        <Form>
          <FormikInput
            type="search"
            placeholder={placeholderText}
            name="search"
            onChange={(e) => {
              setFieldValue('search', formatName(e?.target?.value));
              handleChange(e);
            }} 
          />
        </Form>
      )}
    </Formik>
  );
};
