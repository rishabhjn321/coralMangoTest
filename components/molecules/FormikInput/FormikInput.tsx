import { LocaleString } from '../../atoms/locales';
import { Text } from '../../atoms/Text';
import { InputField } from '../../atoms/InputField';
import { FormikError } from '../../atoms/Error';
import InputCheckbox from '../../atoms/InputCheckbox/InputCheckbox';
import { useField } from 'formik';

export interface IProps {
  id?: string;
  color?: string;
  name?: string;
  type?: string;
  placeholder?: any;
  label?: LocaleString;
  disabled?: boolean;
  validation?: boolean;
  optionsForSelect?: any[];
  valueOfLabel?: string;
  checked?: string | boolean;
  noError?: any;
  lockIcon?: string;
  onChange?: any;
  maxLength?: number;
  required?: boolean;
  onBlur?:any;
}

export const FormikInput = ({ ...props }: IProps) => {
  const [field, meta] = useField(props?.name);
  const { touched, error } = { ...meta };
  return (
    <div className="w-full">
      {props.label && (
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
          <div className="flex">
            <Text id={props.label} />
            {props?.required && <span className="text-red-600">*</span>}
          </div>
        </label>
      )}
      <div className="mt-1 relative w-full">
        <InputField
          touched={touched}
          error={error}
          {...field}
          {...props}
          validation={props.validation}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          autoComplete="off"
        />
      </div>
      <FormikError name={props?.name} />
    </div>
  );
};



export const FormikCheckbox = ({ ...props }: IProps) => {
  const [field, meta] = useField(props.name);
  const { touched, error, value } = { ...meta };

  return (
    <div>
      <div className="flex items-center">
        <InputCheckbox touched={touched} checked={value} error={error} {...field} {...props} />
        {/* dangerouslySetInnerHTML used if the label is of htmltype*/}
        <label htmlFor={props.name} className="ml-2 block text-sm text-gray-900">
          <Text id={props.label} className={props.color}>
            {props.label || props.name}
          </Text>
        </label> 
      </div>
      {!props.noError && <FormikError name={props?.name} />}
    </div>
  );
};
