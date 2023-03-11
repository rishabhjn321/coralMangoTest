import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { IProps } from '../../molecules/FormikInput';
import { useField, useFormikContext } from 'formik';
import { Error } from '../Error';
import { Text } from '../Text';
import { LocaleString } from '../locales';

interface FormikSearchSelectI extends IProps {
  options?: any[];
  fieldName?: string;
  onChange?: any;
  initialField?: any[];
  updateRoleState?: any;
  returnId?: boolean;
  disabled?: boolean;
  menuBar?: LocaleString;
  searchQuery?: string;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const FormikSearchSelect: FC<FormikSearchSelectI> = ({
  updateRoleState,
  initialField,
  ...props
}: FormikSearchSelectI) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } = useFormikContext<any>();

  const [field] = useField(props.fieldName);

  const newValue = useMemo(() => {
    return props?.options?.find((obj: any) => obj?.value === field?.value);
  }, [field?.value, props?.options]);

  const [selected, setSelected] = useState(newValue || props?.options[0]);

  useEffect(() => {
    if (selected && selected !== newValue) {
      setSelected(newValue || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValue]);

  const handleChange = useCallback(
    (value: any) => {
      props?.onChange?.(value?.value);
      setFieldTouched(props?.fieldName, true);
      setSelected(value);

      setFieldValue(props.fieldName, value?.value);

      if (typeof updateRoleState === 'function') {
        updateRoleState(value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSelected, errors, props],
  );

  return (
    <>
      <div>
        <Listbox value={selected} onChange={(value) => handleChange(value)}>
          {({ open }) => (
            <>
              {props.label && (
                <label
                  htmlFor={props.fieldName}
                  className="block text-sm font-medium text-gray-700"
                >
                  <div className="flex">
                    <Text id={props.label} />
                    {props?.required && <span className="text-red-600">*</span>}
                  </div>
                </label>
              )}
              <div className="mt-1 relative">
                <Listbox.Button
                  className={
                    props?.disabled === true
                      ? 'bg-gray-300 relative w-full border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 text-sm hover:cursor-not-allowed'
                      : 'bg-white relative w-full border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm cursor-pointer'
                  }
                >
                  <span className="block truncate text-center">
                    {/* {values[props?.fieldName] ? selected?.label : props?.options[0]?.label} */}
                    {values[props?.fieldName] ? selected?.label : props?.searchQuery}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open && !props?.disabled}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    className={
                      props?.menuBar === 'top'
                        ? `absolute z-10
                        -translate-y-full -mt-10
                          w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm capitalize`
                        : 'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm capitalize'
                    }
                  >
                    {props?.options?.map((person) => (
                      <Listbox.Option
                        key={person?.value}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'cursor-pointer select-none relative py-2 pl-3 pr-9',
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'block truncate',
                              )}
                            >
                              {person?.label}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      {!!errors[props?.fieldName] && touched[props?.fieldName] && (
        <Error text={errors[props?.fieldName] as LocaleString} />
      )}
    </>
  );
};

