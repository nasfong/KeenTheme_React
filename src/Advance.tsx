import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input1 } from './components/Input1';
import { useTranslation } from 'react-i18next';

const Advance = () => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, t('VALIDATION.MUST_BE_15_CHARACTER_OR_LESS'))
        .required('First Name is required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Last Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email Address is required')
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Email Address @mail.com'
        )
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input1
        inline
        label='FORM.FIRST_NAME'
        name='firstName'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
        errors={formik.touched && formik.errors}
      />
      <Input1
        inline
        label='FORM.LAST_NAME'
        name='lastName'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
        errors={formik.touched && formik.errors}
      />
      <Input1
        inline
        label='FORM.EMAIL'
        name='email'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        errors={formik.touched && formik.errors}
      />
      <button className='btn btn-primary btn-sm float-end' type="submit">Submit</button>
    </form>
  );
};

export default Advance