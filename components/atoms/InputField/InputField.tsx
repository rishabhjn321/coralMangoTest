import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import React, { FC, useMemo, useState } from 'react';

type Iprops = {
  error?: string;
  touched?: boolean | string;
  disabled?: boolean;
  validation?: boolean;
  type?: string;
  countryCode?: string | number;
  noErrorIcon?: boolean;
  maxLength?: number;
  name?: string;
  value?: any;
};
export const InputField: FC<Iprops> = ({
  touched,
  error,
  disabled,
  validation,
  type,
  ...rest
}: Iprops) => {
  const isPassword = useMemo(() => type === 'password', [type]);
  const isEmail = useMemo(() => type === 'email', [type]);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <input
        // onChange={handleChange}
        type={isPassword && isOpen ? 'text' : type}
        className={`appearance-none ${type === 'text' && 'capitalize'} block w-full ${
          isEmail ? 'pl-8' : 'pl-3'
        } px-3 py-2 border focus:border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-medium  ${
          ((error && touched) || (Boolean(validation) && error)) && !rest.noErrorIcon
            ? ' border-red-300 pr-10'
            : ' border-gray-300'
        } ${disabled ? 'bg-gray-50' : ''} ${error || (isPassword && 'pr-10 ')} ${
          rest.countryCode && 'pl-12'
        }`}
        {...rest}
        maxLength={rest?.maxLength}
        disabled={disabled}
      />
      {rest.countryCode && (
        <span className="absolute w-10 inset-x-0 top-2 pr-7 pl-2 text-semibold border-r border-gray-300 font-medium">
          {rest.countryCode}
        </span>
      )}
      {((error && touched) || (validation && error)) && !isPassword && !rest.noErrorIcon ? (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <>
          {isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
              {isOpen ? (
                <EyeIcon
                  className="text-gray-600 h-4 w-4 cursor-pointer "
                  onClick={() => setOpen(false)}
                />
              ) : (
                <EyeOffIcon
                  className="text-gray-600 h-4 w-4 cursor-pointer "
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
