import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useField, useFormikContext } from 'formik';
import { Error } from '../Error';
import { en, LocaleString } from '../locales';
import { Text } from '../Text';

interface FormikCheckboxSelectMenuI {
  options?: Option[];
  fieldName?: any;
  label?: LocaleString;
  required?: boolean;
  disabled?: boolean;
  allOption?: boolean;
}

type Option = {
  name?: string;
  id?: string;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const FormikCheckboxSelectMenu: FC<FormikCheckboxSelectMenuI> = ({
  ...props
}: FormikCheckboxSelectMenuI) => {
  const [isOpen, setIsOpen] = useState(false);

  const [field] = useField(props.fieldName);
  const myvalue = useMemo(
    () => field?.value,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field],
  );
  const [selectedPeople, setSelectedPeople] = useState(myvalue || []);
  const { setFieldValue, setFieldTouched, errors, touched } = useFormikContext<any>();

  useEffect(() => {
    if (selectedPeople && selectedPeople !== myvalue) {
      setSelectedPeople(myvalue || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myvalue]);

  const isSelected = useCallback(
    (value) => {
      return selectedPeople?.find((el) => el.id === value.id) ? true : false;
    },
    [selectedPeople],
  );

  const handleDeselect = useCallback(
    (value) => {
      const selectedPersonsUpdated = selectedPeople.filter((el) => el.id !== value.id);
      setSelectedPeople(selectedPersonsUpdated);
      setFieldValue(props?.fieldName, selectedPersonsUpdated);
    },
    [props?.fieldName, selectedPeople, setFieldValue],
  );

  const handleChange = useCallback(
    (value) => {
      const check = props?.options?.length - 2 == selectedPeople?.length;
      setFieldTouched(props?.fieldName, true);
      if (!isSelected(value)) {
        const selectedPersonsUpdated = [
          ...selectedPeople,
          props?.options.find((el) => el.id === value.id),
        ];
        if ((value?.id === 'all' || check) && props?.allOption) {
          setSelectedPeople(props?.options);
          setFieldValue(props?.fieldName, props?.options);
        } else {
          setSelectedPeople(selectedPersonsUpdated);
          setFieldValue(props?.fieldName, selectedPersonsUpdated);
        }
      } else {
        if (value?.id === 'all' && props?.allOption) {
          setSelectedPeople([]);
          setFieldValue(props?.fieldName, []);
        } else {
          if (props?.allOption) {
            const temp = selectedPeople?.filter(
              (item) => item?.id != value?.id && item?.id != 'all',
            );
            setSelectedPeople(temp);
            setFieldValue(props?.fieldName, temp);
          } else handleDeselect(value);
        }
      }
      setIsOpen(true);
    },
    [
      setFieldTouched,
      props?.fieldName,
      props?.options,
      props?.allOption,
      isSelected,
      selectedPeople,
      setFieldValue,
      handleDeselect,
    ],
  );

  const handleclick = () => {
    if (props?.disabled === true) {
      setIsOpen(isOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div>
        <Listbox
          value={selectedPeople}
          onChange={(value) => {
            handleChange(value);
          }}
          // multiple
        >
          {({ open }) => (
            <>
              {props?.label && (
                <label
                  htmlFor={props?.fieldName}
                  className="block text-sm font-medium text-gray-700"
                >
                  <div className="flex">
                    <Text id={props?.label} />
                    {props?.required && <span className="text-red-600">*</span>}
                  </div>
                </label>
              )}
              <div className="mt-1 relative">
                <Listbox.Button
                  // onClick={() => setIsOpen(!isOpen)}
                  onClick={() => handleclick()}
                  className={
                    props?.disabled === true
                      ? 'bg-gray-300 relative w-full border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 text-sm hover:cursor-not-allowed'
                      : 'bg-white relative w-full border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm cursor-pointer'
                  }
                >
                  <span className="block truncate text-center">
                    {selectedPeople.length > 0
                      ? selectedPeople.map((option) => option?.name).join(', ')
                      : '--Select--'}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={isOpen}
                  // show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute z-10 rounded-b-md w-full bg-white  shadow-lg max-h-42 text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm capitalize">
                    <div className={`max-h-40 overflow-auto ${props?.options?.length && 'py-1'}`}>
                      <Listbox.Options>
                        {props?.options?.map((option) => {
                          const selected = isSelected(option);
                          return (
                            <>
                              <Listbox.Option
                                key={option?.id}
                                value={option}
                                className={({ active }) =>
                                  classNames(
                                    'cursor-pointer select-none relative py-2 px-3 hover:bg-gray-100',
                                  )
                                }
                              >
                                {({ active }) => (
                                  <div className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={selected}
                                      readOnly
                                      className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-primary ${
                                        errors[props?.fieldName] && touched[props?.fieldName]
                                          ? ' border-red-300'
                                          : ' border-gray-300'
                                      }`}
                                    />
                                    <div
                                      className={classNames(
                                        selected ? 'font-semibold' : 'font-normal',
                                        'block truncate',
                                      )}
                                    >
                                      {option?.name}
                                    </div>
                                  </div>
                                )}
                              </Listbox.Option>
                            </>
                          );
                        })}
                      </Listbox.Options>
                    </div>
                    <div
                      onClick={() => setIsOpen(false)}
                      className="ring-1 ring-black ring-opacity-5  focus:outline-none cursor-pointer py-1 bottom-0 h-10 bg-indigo-600 text-white text-center items-center flex justify-center rounded-b-md font-medium"
                    >
                      {en.okay}
                    </div>
                  </div>
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
