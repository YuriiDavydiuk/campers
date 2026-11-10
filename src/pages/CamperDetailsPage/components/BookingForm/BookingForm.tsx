import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';

import Button from '../../../../components/Button/Button';
import css from './BookingForm.module.css';
import { useMutation } from '@tanstack/react-query';

import { createBookingRequest } from '../../../../services/campersService';

interface BookingFormProps {
  camperId: string;
}

interface FormValues {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
};

const validate = (values: FormValues) => {
  const errors: FormErrors = {};

  if (!/^[\p{L}\s'-]+$/u.test(values.name.trim())) {
    errors.name = 'Please enter your name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter your email.';
  }

  return errors;
};

export default function BookingForm({ camperId }: BookingFormProps) {
  const mutation = useMutation({
    mutationFn: (values: FormValues) => createBookingRequest(camperId, values),
  });

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    mutation.mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {({ errors, touched }) => {
        const nameHasError = Boolean(touched.name && errors.name);
        const emailHasError = Boolean(touched.email && errors.email);

        return (
          <Form className={css.form} noValidate>
            <div className={css.heading}>
              <h2 className={css.title}>Book your campervan now</h2>
              <p className={css.description}>Stay connected! We are always ready to help you.</p>
            </div>

            <div className={css.formContent}>
              <div className={css.fields}>
                <div className={css.field}>
                  <div className={css.inputWrapper}>
                    {nameHasError && (
                      <label htmlFor="name" className={css.label}>
                        Name*
                      </label>
                    )}

                    <Field
                      id="name"
                      type="text"
                      name="name"
                      placeholder={nameHasError ? '' : 'Name*'}
                      autoComplete="name"
                      className={`${css.input} ${nameHasError ? css.inputError : ''}`}
                      aria-invalid={nameHasError}
                      aria-describedby={nameHasError ? 'name-error' : undefined}
                    />

                    {nameHasError && (
                      <span className={css.errorIcon} aria-hidden="true">
                        !
                      </span>
                    )}
                  </div>

                  <ErrorMessage
                    id="name-error"
                    name="name"
                    component="p"
                    className={css.errorMessage}
                  />
                </div>

                <div className={css.field}>
                  <div className={css.inputWrapper}>
                    {emailHasError && (
                      <label htmlFor="email" className={css.label}>
                        Email*
                      </label>
                    )}

                    <Field
                      id="email"
                      type="email"
                      name="email"
                      placeholder={emailHasError ? '' : 'Email*'}
                      autoComplete="email"
                      className={`${css.input} ${emailHasError ? css.inputError : ''}`}
                      aria-invalid={emailHasError}
                      aria-describedby={emailHasError ? 'email-error' : undefined}
                    />

                    {emailHasError && (
                      <span className={css.errorIcon} aria-hidden="true">
                        !
                      </span>
                    )}
                  </div>

                  <ErrorMessage
                    id="email-error"
                    name="email"
                    component="p"
                    className={css.errorMessage}
                  />
                </div>
              </div>

              <Button type="submit" fullWidth disabled={mutation.isPending}>
                {mutation.isPending ? 'Sending...' : 'Send'}
              </Button>

              {mutation.isSuccess && (
                <p className={css.successMessage} role="status">
                  {mutation.data.message}
                </p>
              )}

              {mutation.isError && (
                <p className={css.requestError} role="alert">
                  Failed to send booking request. Please try again.
                </p>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
