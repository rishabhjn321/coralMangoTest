import { useFormikContext } from 'formik';
import { LocaleString } from '../locales';
import { Text } from '../../atoms/Text';

interface FormikRadioProps {
  name: string;
  label?: LocaleString;
  options: any;
  subText?: LocaleString;
  onChange?: any;
}
export const FormikRadio = ({ ...props }: FormikRadioProps) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(props?.name, event.target.value);
    props?.onChange?.(props?.name);
  };

  return (
    <div className="w-full ">
      {props?.label && (
        <Text id={props?.label} className="block text-sm font-medium text-gray-700" />
      )}
      {props?.subText && (
        <Text id={props?.subText} className="block text-xs font-small text-gray-700 mb-2" />
      )}

      {props?.options.map((obj: any, i: any) => (
        <div key={i} className=" inline-block mr-3">
          <div className="mt-1 relative w-full flex ">
            <input
              name={props?.name}
              type="radio"
              value={obj.value}
              checked={values[props?.name] === obj.value}
              className="w-4 h-4 cursor-pointer"
              onClick={(e: any) => handleChange(e)}
            />
            <label className="block text-sm font-medium text-primary ml-2 text-gray-700 mt-[-3px]">
              {obj.label}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
