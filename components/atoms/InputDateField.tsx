import React, { FC, useCallback } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormikContext, useField } from 'formik';
import { CalendarIcon } from '@heroicons/react/outline';

interface Iprops {
  error?: string;
  touched?: boolean | string;
  disabled?: boolean;
  validation?: boolean;
  value: string;
  name: string;
  minDate?: Date;
  maxDate?: Date;
  //   showYearDropdown?: boolean;
  //   scrollableYearDropdown?: boolean;
  //   yearDropdownItemNumber?: number;
}

const InputDateField: FC<Iprops> = ({ ...props }: Iprops) => {
  const { value, name, touched, error, disabled, validation, ...rest } = {
    ...props,
  };

  const [field] = useField(name);
  const formik = useFormikContext();
  const { setFieldValue } = formik;

  const handleChange = useCallback(
    (date: any) => {
      setFieldValue(name, date);
    },
    [setFieldValue, name],
  );

  return (
    <>
      <DatePicker
        // calendarClassName={`block w-full`}
        // customInput={<input />}
        className={`appearance-none block w-full px-3 py-2 font-medium border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  ${
          (error && touched) || (validation && error) ? ' border-red-300 pr-10' : ' border-gray-300'
        } ${disabled ? 'bg-gray-100' : ''}`}
        {...rest}
        disabled={disabled}
        selected={field?.value}
        onChange={handleChange}
        dateFormat={'MM/dd/yyyy'}
        showYearDropdown={true}
        dropdownMode="select"
        scrollableYearDropdown={true}
        yearDropdownItemNumber={30}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <CalendarIcon className="h-5 w-6 text-gray-700" />
      </div>
    </>
  );
};

export default InputDateField;

// InputDateField.defaultProps = {
//   showYearDropdown: true,
//   scrollableYearDropdown: true,
//   yearDropdownItemNumber: 20,
// };
