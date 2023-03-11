import { FC, Fragment, useCallback, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { IProps } from '../../molecules/FormikInput';

interface SelectMenuI extends IProps {
  options?: Option[];
  selectOption?: string;
  setSelectOption?: React.Dispatch<React.SetStateAction<string>>;
  fieldName?: string;
  setFieldValue?:any;
  onChange?:any;
}

type Option = {
  name?: string;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const SelectMenu: FC<SelectMenuI> = ({
  options,
  setSelectOption,
  selectOption,
  ...props
}: SelectMenuI) => {
  const [selected, setSelected] = useState(selectOption || options[0]?.name);
  const handleChange = useCallback(
    (value: string) => {
      props?.onChange?.(value);
      setSelected(value);
      setSelectOption(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSelected, setSelectOption],
  );

  return (
    <Listbox value={selected} onChange={(value) => handleChange(value)}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm cursor-pointer">
              <span className="block truncate text-center">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm capitalize">
                {options?.map((person) => (
                  <Listbox.Option
                    key={person?.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-pointer select-none relative py-2 pl-3 pr-9',
                      )
                    }
                    value={person?.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {person?.name}
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
  );
};
