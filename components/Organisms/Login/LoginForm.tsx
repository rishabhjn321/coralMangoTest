import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import FormikInput, { FormikCheckbox } from '../../molecules/FormikInput';
import { validateEmail, validatePassword } from '../../validators';
import { Button } from '../../atoms/Button';
// import { AppContext } from '../../context/loginContext';
import { Text } from '../../atoms/Text';
// import { loginRoleContext } from '../../context/roleContext';
// import { en } from '../../atoms/locales/en';

const LoginFormValidationSchema = yup.object().shape({
  email: validateEmail(),
  // password: validatePassword(),
});
function LoginForm() {
  // const { roleState, dispatch } = useContext(loginRoleContext);
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    remember_me: false,
  });
  const router = useRouter();

  const ref = useRef(null);
  useEffect(() => {
    const getUsername = localStorage.getItem('Username');
    const getPassword = localStorage.getItem('password');

    if (getUsername && getPassword) {
      setInitialValues({
        email: getUsername,
        password: getPassword,
        remember_me: true,
      });
    }
  }, []);
  // const {
  //   action: { login },
  //   // state,
  // } = useContext(AppContext);

  const onSubmitHandler = useCallback(
    (values: any) => {
      // login(values);
      if(values?.email === "demo@coralmango.com" && values?.password === "demo123"){
        localStorage.setItem('Username', values?.email);
        localStorage.setItem('password', values?.password);
        router?.push('/admin/dashboard');
      }
      else{
        router?.push('/')
      }
    },
    [],
  );
  // const onSubmitHandler = useCallback(
  //   (values: any) => {
  //     login(values);
  //   },
  //   [login],
  // );

  // useEffect(() => {
  //   // if (state.isAuthenticated) {
  //     // if (state.role == 'admin') {
  //       router.push('/admin/dashboard');
  //     // }
  //   // }
  // }, [state, router]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmitHandler}
        innerRef={ref}
        validationSchema={LoginFormValidationSchema}
      >
        {({ values, dirty, isValid, setFieldValue }) => (
          <Form>
            <div className="min-h-full flex flex-col justify-center sm:px-6 lg:px-8 h-screen bg-gray-50">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Text id="logideckText" className="mx-auto h-12 w-auto flex justify-center" />
                <Text id="signIn" className=" text-center text-3xl font-extrabold text-gray-900" />
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white  shadow sm:rounded-lg ">
                  <div>
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="py-8  px-4 sm:px-10 space-y-6">
                    <div className="mt-1">
                      <FormikInput id="email" name="email" label="emailAddressLabel" />
                    </div>

                    <div className="mt-1">
                      <FormikInput id="password" type="password" name="password" label="password" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FormikCheckbox
                          id="remember_me"
                          type="checkbox"
                          name="remember_me"
                          label="rememberMeCheckbox"
                          onChange={() => {
                            if (values?.remember_me === true) {
                              localStorage.removeItem('Username');
                              localStorage.removeItem('password');
                            }
                            setFieldValue('remember_me', !values?.remember_me);
                          }}
                        />
                      </div>

                      <div className="text-sm">
                        <Text
                          className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer "
                          onClick={() => router.push('/')}
                          id="forgotPass"
                        />
                      </div>
                    </div>

                    <div>
                      <Button
                        // loading={state.loading}
                        variant={'full-width'}
                        loaderid="loginLinkButton"
                        textid="loginLinkButton"
                        type="submit"
                        disabled={!isValid || (!dirty && !initialValues?.email)}
                      />
                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <Text id="or" className="px-0.5 bg-white text-gray-500  " />
                            <Text
                              id="registerHere"
                              className="text-indigo-600 bg-white px-1 cursor-pointer"
                              onClick={() => router.push('/')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
