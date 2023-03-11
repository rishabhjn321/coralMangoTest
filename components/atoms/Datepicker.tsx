import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { CalendarIcon } from '@heroicons/react/solid';
import { Text } from './Text';
import { FormikError } from './Error/Error';

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue, validateField, handleBlur, setFieldTouched } = useFormikContext();
  const [field] = useField(props.name);
  return (
    <>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {props.label && (
          <div className="flex">
            <Text id={props.label} />
            {props?.required && <span className="text-red-600">*</span>}
          </div>
        )}
        <div className="grid grid-cols-6 gap-6 mt-2 ">
          <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
              setFieldValue(field.name, val ? moment(val.toString()).format('ll') : '');
            }}
            dateFormat="MMM dd, yyyy"
            showYearDropdown
            maxDate={moment().toDate()}
            className={`rounded-[5px] sm:w-[422px] block border focus:border-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`}
            onCalendarClose={(val) => {
              validateField(props.name);
            }}
            onBlur={(e) => {
              handleBlur(e);
            }}
            onChangeRaw={(e) => {
              setFieldTouched(field.name, true, true);
            }}
          />
          <div className="object-right w-5 h-5 text-gray-500 sm:ml-[390px] mt-3 absolute pointer-events-none cursor-pointer">
            <CalendarIcon />
          </div>
        </div>
      </label>
      <FormikError name={props?.name} />
    </>
  );
};

export default DatePickerField;