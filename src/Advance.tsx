import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Input } from './components/Input';
import { CheckBox } from './components/CheckBox';
import { normalizeInput } from './components/Phone';
import { useState } from 'react'

const Advance = () => {
  const { t } = useTranslation()


  const formik = useFormik({
    initialValues: {
      isRequired: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      isRequired: Yup.boolean(),
      firstName: Yup.string()
        .when('isRequired', {
          is: true,
          then: (schema) =>
            schema
              .max(15, (res) => t('VALIDATION.MUST_BE_CHARACTER_OR_LESS', { num: res.max }))
              .required(t('VALIDATION.IS_REQUIRED', { name: t('FORM.FIRST_NAME') })),
        }),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Last Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email Address is required')
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Should be '@mail.com'"
        ),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Pasword must be 8 or more characters")
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
        .matches(/\d/, "Password should contain at least one number")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
      confirmPassword: Yup.string().when("password", (password, field: any) => {
        if (password) {
          return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
        }
      }),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    },
  });
  const [phone, setPhone] = useState('')
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name='phone'
        onChange={(e) => {
          setPhone(normalizeInput(e.target.value, phone))
        }}
        value={phone}
      />
      <Input
        inline
        label='FORM.LAST_NAME'
        name='lastName'
        formik={formik}
      />
      <CheckBox
        name='isRequired'
        formik={formik}
      />
      <Input
        inline
        label='FORM.FIRST_NAME'
        name='firstName'
        formik={formik}
      />
      <Input
        inline
        label='FORM.EMAIL'
        name='email'
        formik={formik}
      />
      <Input
        inline
        label='FORM.PASSWORD'
        type='password'
        name='password'
        formik={formik}
        autoComplete='on'
      />
      <Input
        inline
        label='FORM.CONFIRM_PASSWORD'
        type='password'
        name='confirmPassword'
        formik={formik}
        autoComplete='on'
      />

      <button className='btn btn-primary btn-sm float-end' type="submit">Submit</button>
    </form>
  );
};

export default Advance