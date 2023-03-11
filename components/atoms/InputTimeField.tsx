import React, { FC, useCallback, useState } from 'react';

import { ClockIcon } from '@heroicons/react/outline';
// import TimePicker from 'rc-time-picker';import 'rc-time-picker/assets/index.css';
// import moment from '../../node_modules/moment/ts3.1-typings/moment';
import TimePicker from 'rc-time-picker';
import { useFormikContext } from 'formik';
import moment from 'moment';

interface Iprops {
  error?: string;
  touched?: boolean | string;
  disabled?: boolean;
  validation?: boolean;
  value: string;
  name: string;
  // format?: '12' | '24';
}

const InputTimeField: FC<Iprops> = ({ ...props }: Iprops) => {
  const { value, name, touched, error, disabled, validation, ...rest } = {
    ...props,
  };
  const [timeValue, setTimeValue] = useState<any>(value ? moment(value) : null);

  const formik = useFormikContext();
  const { setFieldValue } = formik;

  const handleChange = useCallback(
    (time: any) => {
      setFieldValue(name, time?.format('hh:mm a'));
      setTimeValue(time);
    },
    [setFieldValue, name],
  );
  return (
    <>
      <TimePicker
        className={`block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md  ${
          (error && touched) || (validation && error) ? ' border-red-300' : ' border-gray-300'
        } ${disabled ? 'bg-gray-100' : ''}`}
        {...rest}
        value={timeValue}
        disabled={disabled}
        showSecond={false}
        // use12Hours={props?.format ? (props?.format === '12' ? true : false) : true}
        use12Hours
        onChange={handleChange}
        clearIcon={false}
        showHour={true}
        showMinute={true}
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ClockIcon className="h-5 w-6 text-gray-700" />
      </div>
    </>
  );
};

export default InputTimeField;
