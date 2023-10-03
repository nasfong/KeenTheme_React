import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Input } from './components/Input';
import { CheckBox } from './components/CheckBox';
import { normalizeInput } from './components/Phone';
import { useState } from 'react'
import { InputV } from './components/InputV';
import { Form } from 'react-bootstrap';
import i18n from './_metronic/i18n/i18n';

const Advance = () => {
  const { t } = useTranslation()

  const [phone, setPhone] = useState('')

  const formik = useFormik({
    initialValues: {
      isRequired: false,
      firstName: '',
      lastName: '',
      dob: '',
      price: 0,
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
              .max(15)
              .required(),
        })
        .label(t('FORM.FIRST_NAME'))
      ,
      lastName: Yup.string()
        .min(5)
        .max(20)
        .required()
        .typeError('A number is required')
        .label(t('FORM.LAST_NAME'))
        .length(10),
      price: Yup.number()
        .min(500)
        .max(1000000)
      // .lessThan(600)
      ,
      dob: Yup.date()
        .required()
        .min(new Date())
      ,
      email: Yup.string()
        .email()
        .required('Email Address is required')
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password must be 8 or more characters")
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
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
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }, 500);
    },
  });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  // console.log(formik)
  return (
    <form onSubmit={formik.handleSubmit}>
      <button className='btn btn-danger btn-sm' onClick={() => changeLanguage("en")}>en</button>
      <button className='btn btn-dark btn-sm' onClick={() => changeLanguage("kh")}>kh</button>

      <Form.Group className='mb-5'>
        <Form.Label className='form-label text-nowrap required'>
          {t('FORM.FIRST_NAME')}
        </Form.Label>
        <InputV
          name='firstName'
          formik={formik}
        />
      </Form.Group>
      <Form.Group className='mb-5'>
        <Form.Label className='form-label text-nowrap required'>
          {t('FORM.LAST_NAME')}
        </Form.Label>
        <InputV
          name='lastName'
          formik={formik}
        />
      </Form.Group>
      <Form.Group className='mb-5'>
        <Form.Label className='form-label text-nowrap required'>
          Birth
        </Form.Label>
        <InputV
          name='dob'
          type='date'
          formik={formik}
        />
      </Form.Group>
      <Form.Group className='mb-5'>
        <Form.Label className='form-label text-nowrap required'>
          Price
        </Form.Label>
        <InputV
          name='price'
          type='number'
          formik={formik}
        />
      </Form.Group>
      <Input
        name='phone'
        onChange={(e) => {
          setPhone(normalizeInput(e.target.value, phone))
        }}
        value={phone}
      />
      <CheckBox
        name='isRequired'
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