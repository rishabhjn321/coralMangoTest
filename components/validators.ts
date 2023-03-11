import * as yup from 'yup';
// import { en } from '../../atoms/locales';
const phoneNumberRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
const mileNumberRegExp = /^0*[0-9]\d*$/;
const mile2NumberRegExp = /^([1-9]|[1-4]\d|50)$/;
const emptyName = /^(?=.*[a-zA-Z])[ A-Za-z0-9_@./#&+-]+$/;
const emailValidation = /^[A-Za-z]+([\.-]?\w+)*@\w+[a-z]+\.(?:[A-Z]{2}|com|org|net|gov|mil|in|info|co.in|au.in|)$/;
const characterWhiteSpace = /^(?=.*[a-zA-Z])[A-Za-z0-9\^_`]+$/;

export const validateNewPassword = () =>
  yup
    .string()
    .min(8, 'minimumPasswordLengthValidationText')
    .required('mandatoryPasswordText')
    .max(12, 'maximumPasswordLengthValidationText');

export const validateConfirmPassword = () =>
  yup
    .string()
    .required('mandatoryPasswordConfirmText')
    .oneOf([yup.ref('password')], 'unmatchedPasswordText');

export const validateEmail = () =>
  yup
    .string()
    .required('emailValidationText')
    // .email('invalidEmailValidationText')
    .matches(emailValidation, 'invalidEmailValidationText');

export const validatePassword = () =>
  yup.string().required('passwordValidationText').min(8, 'minimumPasswordLengthValidationText');

export const validateFirstName = () =>
  yup.string().matches(characterWhiteSpace, 'firstNameValidation2').required('firstNameValidation');

export const validateLastName = () =>
  yup.string().matches(characterWhiteSpace, 'lastNameValidation2').required('lastNameValidation');

export const validatePhone = () =>
  yup
    .string()
    .required('phoneValidation')
    .min(14, 'phoneValidationMin')
    .max(14, 'phoneValidationMax')
    .matches(phoneNumberRegExp, 'phoneInvalid');

export const validateAddress = () => yup.string().required('addressValidation');
export const validateZip = () =>
  yup
    .string()
    .required('zipValidation')
    .matches(/^[0-9]{1,5}$/, 'zipValidationInvalid')
    .min(5, 'zipValidationMin');
export const validateDate = () => yup.string().required('dateValidation');

export const validateRole = () => yup.string().required('roleValidation');


export const validateState = () => yup.string().required('district_state_required');

export const validateCity = () => yup.string().required('district_city_required');

export const validationDistrict = () =>
  yup.array().required('district_district_required').min(1, 'district_district_required').defined();
  
  export const validateShift = () => yup.array().required('shiftValidation').min(1, 'district_district_required').defined();
  export const validateOpenTime = () => yup.string().required('adminOpenTimeValidation').min(1, 'adminOpenTimeValidation').defined();
  export const validateCloseTime = () => yup.string().required('adminCloseTimeValidation').min(1, 'adminCloseTimeValidation').defined();

export const validateMile = () =>
  yup
    .string()
    .matches(mileNumberRegExp, 'milesValidation')
    .matches(mile2NumberRegExp, 'milesLengthValidation');

export const validationNotes = () => yup.string().max(100, 'travelNotesValidation');

export const validateName = () =>
yup.string().matches(emptyName, 'nameValidation2').required('nameValidation1');

export const validateCustomerName = () =>
  yup.string().matches(emptyName, 'customer_Add_Validation2').required('customer_Add_Validation');

export const validateCustomerNameEdit = () =>
  yup.string().matches(emptyName, 'customer_Add_Validation2').required('customer_Add_Validation');

export const validateContactFirstName = () =>
  yup.string().matches(emptyName, 'firstNameValidation2').required('firstNameValidation');

export const validateContactLastName = () =>
  yup.string().matches(emptyName, 'lastNameValidation2').required('lastNameValidation');
export const validateTitle = () => yup.string().required('titleValidation');
