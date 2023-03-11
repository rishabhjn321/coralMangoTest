import React, { FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface Iprops {
  error?: string;
  touched?: boolean | string;
  validation?: boolean;
}

const InputTextArea: FC<Iprops> = ({ ...props }: Iprops) => {
  const { touched, error, validation, ...rest } = { ...props };

  return (
    <>
      <TextareaAutosize
        minRows={3}
        maxRows={5}
        className={`resize-y  w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          (error && touched) || (validation && error) ? ' border-red-300' : ' border-gray-300'
        }`}
        {...rest}
      />
    </>
  );
};

export default InputTextArea;
