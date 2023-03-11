import React from 'react';

type Iprops = {
  error?: string;
  touched?: boolean | string;
  disabled?: boolean;
  validation?: boolean;
  type?: string;
};

const InputCheckbox = ({ ...props }: Iprops) => {
  const { touched, error, validation, ...rest } = { ...props };
  return (
    <input checked
      className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-primary rounded ${
        (error && touched) || (validation && error) ? ' border-red-300' : ' border-gray-300'
      }`}
      {...rest}
    />
  );
};

export default InputCheckbox;