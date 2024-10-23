'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Divider, Callout } from '@tremor/react';
import { withFormik, FormikProps } from 'formik';
import { registrationSchema } from './form/validation.schema';
import {
  REGISTER_FIELDS as FIELDS,
  REGISTER_FIELDS_INITIAL_VALUES
} from './form/fields';
import { IRegister } from './form/types';
import ERRORS from '../../constants/errors';
import Container from '../common/Container';
import Input from '../common/Input';
import { IUserProfile } from './UserProfileContainer';
import { registerUser } from '../../app/register/action';

const RegisterForm = (props: any) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    status,
    isAdmin,
    isEdit,
    user
  } = props;

  const { duplicateRegistration } = errors;

  const router = useRouter();

  useEffect(() => {
    if (status) {
      if (!isAdmin && !isEdit) {
        let timerId = setTimeout(() => {
          router.push('/', { scroll: true });
        }, 1000 * 10);

        return () => {
          clearTimeout(timerId);
        };
      } else {
        router.refresh();
        return () => {
          // clearTimeout(timerId)
        };
      }
    }
  }, [status, router, isAdmin, isEdit]);

  const extendedEmiratesIdExpiryDate = {
    label: "Externded Expiry Date",
    id: "extendedEmiratesIdExpiryDate",
    type: "date"
  }

  const maxDate = new Date(user.emiratesIdExpiryDate);

  return (
    <>
      <Container>
        {duplicateRegistration && (
          <Callout
            title="Duplication Registration"
            color="red"
            className="mt-2"
          >
            Email or EmirateID is not available to register, please try login.
          </Callout>
        )}

        {status && !isAdmin && !isEdit && (
          <Callout
            title="Thanks for register for EPassport Verification"
            color="green"
            className="my-4"
          >
            Please check your email for futher details and Please login to
            upload the documents...
          </Callout>
        )}

        {status && !isAdmin && isEdit && (
          <Callout
            title="Details Updated"
            color="green"
            className="my-4"
          >
          </Callout>
        )}

        {
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FIELDS.map(({ label, id, type, options = [], search }) => (
                <Input
                  key={id}
                  label={label}
                  type={type || 'text'}
                  id={id}
                  placeholder={label}
                  value={values[id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={id === 'middleName' ? false : true}
                  error={touched[id] && errors[id]}
                  options={options}
                  search={search}
                />
              ))}
              {isAdmin && (
                <Input
                  label={extendedEmiratesIdExpiryDate.label}
                  type={extendedEmiratesIdExpiryDate.type}
                  id={extendedEmiratesIdExpiryDate.id}
                  placeholder="Select Date after expiry"
                  value={values[extendedEmiratesIdExpiryDate.id]}
                  minDate={user.emiratesIdExpiryDate}
                  maxDate={maxDate.setDate(maxDate.getDate() + 30)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
            </div>
            <Divider />
            {!isAdmin  && (
              <div className="flex justify-end space-x-4">
                <Link href="/">
                  <Button variant="secondary" type="button">
                    Cancel
                  </Button>
                </Link>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            )}

            {isAdmin && (
              <>
                {!status && (
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      color="green"
                      disabled={!user?.documents?.length}
                    >
                      Save and Approve
                    </Button>
                  </div>
                )}

                {status && (
                  <Callout
                    title="User status updated, please check the documents"
                    color="green"
                    className="my-4"
                  ></Callout>
                )}
              </>
            )}
          </form>
        }
      </Container>
    </>
  );
};

const UserRegisterForm = withFormik<
  {
    user: IUserProfile;
    isAdmin: boolean;
    isEdit?: boolean;
  },
  IRegister
>({
  mapPropsToValues: ({ user }) => {
    if (user) {
      return {
        ...user,
        dateOfBirth: user.dateOfBirth?.toISOString()?.split('T')[0],
        emiratesIdExpiryDate: user.emiratesIdExpiryDate?.toISOString()?.split('T')[0],
        extendedEmiratesIdExpiryDate: user.extendedEmiratesIdExpiryDate?.toISOString()?.split('T')[0],
      } as any;
    }
    return REGISTER_FIELDS_INITIAL_VALUES;
  },

  validationSchema: registrationSchema,
  handleSubmit: async (
    values: IRegister,
    { setSubmitting, setErrors, setStatus, props }
  ) => {
    const { isAdmin, user, isEdit } = props || {};
    try {
      setSubmitting(true);
      setStatus(false);
      let response = await registerUser(values, isAdmin, isEdit);
      const { status, error } = response;
      setStatus(status);
      if (error) {
        if (error === ERRORS.AUTH.USER_ALREADY_REGISTER) {
          setErrors({ duplicateRegistration: true } as any);
        }
      }
    } catch (error: any) {
      if (error.message === ERRORS.AUTH.USER_ALREADY_REGISTER) {
        setErrors({ duplicateRegistration: true } as any);
      }
      console.error(error);
    }
  }
})(React.memo(RegisterForm));

export default React.memo(UserRegisterForm);
