import { Text } from '../Text';
import { LocaleString } from '../locales';
import { BeatLoader, CircleLoader } from 'react-spinners';
import { twCascade } from '@mariusmarais/tailwind-cascade';
import { useCallback, useState } from 'react';

type ButtonProps = {
  loading?: boolean;
  id?: string;
  disabled?: boolean;
  beatLoaderSize?: number;
  textid?: LocaleString;
  loaderid?: LocaleString;
  className?: any;
  children?: any;
  type?: 'submit' | 'button' | 'reset';
  onclick?: any;
  onClick?: any;
  showAsyncLoad?: any;
  style?: any;
  variant?: string;
  icon?: any;
  bgColor?: string;
  color?: string;
};

export function Button(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  const [asyncLoading, setLoading] = useState(false);
  const onClickHandler = useCallback(
    async (...arg) => {
      setLoading(true);
      try {
        await props?.onclick?.(arg);
      } finally {
        setLoading(false);
      }
    },
    [props],
  );

  return (
    <>
      <button
        type={props?.type || 'submit'}
        onClick={onClickHandler}
        {...propsNew}
        className={twCascade(
          `flex items-center justify-center rounded-md focus:outline-none bg-blue-500 text-sm px-4 py-3 font-normal text-white `,

          props.variant === 'common' &&
            'bg-white text-[#2f4464] font-bold hover:bg-[#2f4464] hover:border-[#2f4464] hover:text-white transition ease-in-out delay-75 duration-600 py-3 px-8 rounded-full border border-[#eee]',

          props.variant === 'full-width' &&
            (props.disabled
              ? 'w-full flex justify-center py-2 px-4 bg-[#f5f5f5] text-gray-400 border border-[#d9d9d9] hover:cursor-not-allowed hover:bg-[#f5f5f5]'
              : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'),

          props.variant === 'square' &&
            (props.disabled
              ? `flex justify-center py-1 px-3  bg-[#f5f5f5]  text-gray-400 border border-[#d9d9d9] hover:cursor-not-allowed hover:bg-[#f5f5f5]
                } `
              : `flex justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-${
                  props?.color ? props?.color : 'white'
                }  bg-${props?.bgColor ? `[${props?.bgColor}]` : 'indigo-600'}  hover: ${
                  props?.bgColor ? props?.bgColor : 'bg-indigo-700'
                }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`),

          props.variant === 'rounded' &&
            (props.disabled
              ? 'inline-flex items-center px-7 py-2 shadow-sm text-sm font-medium rounded-full bg-[#f5f5f5] text-gray-400 border border-[#d9d9d9] hover:cursor-not-allowed hover:bg-[#f5f5f5]'
              : 'inline-flex items-center px-7 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'),

          props.disabled
            ? 'bg-[#f5f5f5] text-gray-400 border border-[#d9d9d9] hover:cursor-not-allowed hover:bg-[#f5f5f5]'
            : 'cursor-pointer',

          props.className,
        )}
        disabled={props?.loading || props?.disabled || (props?.showAsyncLoad && asyncLoading)}
      >
        {props?.loading || (props.showAsyncLoad && asyncLoading) ? (
          <div className="flex justify-center items-center ">
            <CircleLoader size={15} color="#fff" />
            {props.loaderid && <Text id={props?.loaderid} className="pl-2" />}
          </div>
        ) : props?.textid ? (
          <Text id={props?.textid} />
        ) : props?.children ? (
          props?.children
        ) : null}
      </button>
    </>
  );
}

export function CancelButton(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  return (
    <>
      <button
        {...propsNew}
        className={twCascade(
          `flex justify-center items-center shadow-sm border border-black bg-transparent rounded-md focus:outline-none text-sm px-4 py-3 text-black
 `,
          props.className,
        )}
      >
        {props?.loading ? (
          <BeatLoader loading size={props?.beatLoaderSize || 11} color="#fff" />
        ) : props?.textid ? (
          <Text id={props?.textid} />
        ) : props?.children ? (
          props?.children
        ) : null}
      </button>
    </>
  );
}
export function TextButton(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  const [asyncLoading, setLoading] = useState(false);
  const onClickHandler = useCallback(
    async (...arg) => {
      setLoading(true);
      try {
        await props?.onclick?.(arg);
      } finally {
        setLoading(false);
      }
    },
    [props],
  );
  return (
    <>
      <div
        onClick={onClickHandler}
        className={twCascade(
          `px-4 shadow-sm hover:border-primary border-2 hover:font-bold  focus:outline-none text-sm  font-bold  text-white
 `,
          props.disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary cursor-pointer',
          props.className,
        )}
        disabled={props?.loading || props?.disabled || (props?.showAsyncLoad && asyncLoading)}
        {...propsNew}
      >
        {props?.loading || (props.showAsyncLoad && asyncLoading) ? (
          <BeatLoader size={props?.beatLoaderSize || 11} color="#000" />
        ) : props?.textid ? (
          <Text id={props?.textid} />
        ) : props?.children ? (
          props?.children
        ) : null}
      </div>
    </>
  );
}

export function UpIconButton(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  const onClickHandler = () => {
    props.onclick();
  };
  return (
    <>
      <button
        onClick={onClickHandler}
        className=" items-center px-2 py-2 border border-transparent shadow-sm text-sm  rounded-full text-gray-400 bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        type="button"
        {...propsNew}
      >
        <div className=" items-center">
          <props.icon className=" ml-1 mr-1 h-5 w-5 " aria-hidden="true" />
        </div>

        {/* Button text */}
        {props?.textid ? <Text id={props?.textid} /> : props?.children ? props?.children : null}
      </button>
    </>
  );
}

export function IconClickButton(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];

  const onClickHandler = () => {
    props.onclick();
  };
  return (
    <>
      <button
        onClick={onClickHandler}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        {...propsNew}
      >
        <props.icon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        {/* Button text */}
        {props?.textid ? <Text id={props?.textid} /> : props?.children ? props?.children : null}
      </button>
    </>
  );
}

export function IconButton(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  const onClickHandler = () => {
    props.onclick();
  };
  return (
    <>
      <button
        onClick={onClickHandler}
        type="button"
        className="inline-flex items-center px-7 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <props.icon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        {/* Button text */}
        {props?.textid ? <Text id={props?.textid} /> : props?.children ? props?.children : null}
      </button>
    </>
  );
}

export function RoundButton(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  const onClickHandler = () => {
    props.onclick();
  };
  return (
    <button
      onClick={onClickHandler}
      type="button"
      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <props.icon className="h-6 w-6" aria-hidden="true" />
      {/* Button text */}
      {props?.textid ? <Text id={props?.textid} /> : props?.children ? props?.children : null}
    </button>
  );
}

export function ImageButton(props: ButtonProps) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-indigo-600"
      >
        <props.icon className="h-4 w-4" aria-hidden="true" />
        {/* Button text */}
        {props?.textid ? <Text id={props?.textid} /> : props?.children ? props?.children : null}
      </button>
    </>
  );
}

export function AddButton(props) {
  const propsNew = { ...props };
  delete propsNew['loading'];
  delete propsNew['beatLoaderSize'];
  // const onClickHandler = () => {
  //   props.onclick();
  // };

  return (
    <>
      <button
        // onClick={onClickHandler}
        type="button"
        // className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        className="inline-flex items-center px-7 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {props?.textid ? <Text id={props?.textid} /> : props?.children ? props?.children : null}
      </button>
    </>
  );
}
