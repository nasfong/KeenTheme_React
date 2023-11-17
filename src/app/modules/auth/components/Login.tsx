/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as auth from '../redux/AuthRedux'
import { login, requestChangePassword } from '../redux/AuthCRUD'
import { DataContext } from '../../../reducer/GlobalState'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const chagePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

export function Login() {
  const dispatch1 = useDispatch()
  const { dispatch } = useContext(DataContext)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [firstLogin, setFirstLogin] = useState('')
  const [errors, setErrors] = useState<any>({})
  const [errors2, setErrors2] = useState<any>({})

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setStatus('')
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data }) => {
            if (data.status === 'success') {
              if (typeof data.data.first_login !== 'undefined' && data.data.first_login !== '') {
                setFirstLogin(data.data.first_login)
              } else {
                dispatch1(auth.actions.login(data.data.token))
                dispatch({
                  type: 'NOTIFY',
                  payload: { success: data.message },
                  count: 3000,
                })
              }
            } else if (data.status === 'validation') {
              setSubmitting(false)
              setStatus(data.message)
              setErrors(data.data)
            } else {
              setSubmitting(false)
              setStatus(data.message)
            }
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            setSubmitting(false)
            setStatus(err.message)
          })
      }, 1000)
    },
  })

  const formik2 = useFormik({
    initialValues: {
      password: '',
      changepassword: '',
    },
    validationSchema: chagePasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading2(true)
      setErrors([])
      setTimeout(() => {
        requestChangePassword(values.password, values.changepassword, firstLogin)
          .then(({ data }) => {
            if (data.status === 'success') {
              setFirstLogin('')
              formik.setFieldValue('password', '')
              formik.setSubmitting(false)
            } else if (data.status === 'validation') {
              setSubmitting(false)
              setErrors2(data.data)
            } else {
              setStatus(data.message)
              setSubmitting(false)
            }
            setLoading2(false)
          })
          .catch((err) => {
            setStatus(err.message)
            setLoading2(false)
            setSubmitting(false)
          })
      }, 1000)
    },
  })

  if (firstLogin !== '')
    return (
      <>
        <form
          className='form w-100'
          onSubmit={formik2.handleSubmit}
          noValidate
          id='kt_login_signin_form'
        >
          <div className='text-center mb-10'>
            <h1 className='text-dark mb-3'>Please Change Password</h1>
          </div>

          {formik2.status ? (
            <div className='mb-lg-5 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{formik2.status}</div>
            </div>
          ) : (
            ''
          )}

          {/* begin::Form group Password */}
          <div className='mb-10 fv-row' data-kt-password-meter='true'>
            <div className='mb-1'>
              <label className='form-label fw-bolder text-dark fs-6'>Password</label>
              <div className='position-relative mb-3'>
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='off'
                  {...formik2.getFieldProps('password')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid': formik2.touched.password && formik2.errors.password,
                    },
                    {
                      'is-valid': formik2.touched.password && !formik2.errors.password,
                    },
                    {
                      'is-invalid': !!errors2.password,
                    },
                  )}
                />
                {!!errors2.password && (
                  <div className='fv-plugins-message-container'>
                    {' '}
                    <div className='fv-help-block'>{errors2.password}</div>
                  </div>
                )}
                {formik2.touched.password && formik2.errors.password && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik2.errors.password}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* end::Form group */}

          {/* begin::Form group Confirm password */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
            <input
              type='password'
              placeholder='Password confirmation'
              autoComplete='off'
              {...formik2.getFieldProps('changepassword')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik2.touched.changepassword && formik2.errors.changepassword,
                },
                {
                  'is-valid': formik2.touched.changepassword && !formik2.errors.changepassword,
                },
              )}
            />
            {formik2.touched.changepassword && formik2.errors.changepassword && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik2.errors.changepassword}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          <div className='text-center'>
            <button
              type='submit'
              id='kt_sign_in_submit'
              className='btn btn-lg btn-primary w-100 mb-5'
              disabled={formik2.isSubmitting || !formik2.isValid}
            >
              {!loading2 && <span className='indicator-label'>Continue</span>}
              {loading2 && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </>
    )

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In</h1>
      </div>

      {formik.status ? (
        <div className='mb-lg-5 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        ''
      )}

      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            },
            {
              'is-invalid': !!errors.email,
            },
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {!!errors.email && (
          <div className='fv-plugins-message-container'>
            {' '}
            <div className='fv-help-block'>{errors.email}</div>
          </div>
        )}
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container invalid-feedback'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            {/* <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Forgot Password ?
            </Link>  */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          placeholder='Password'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            },
            {
              'is-invalid': !!errors.password,
            },
          )}
        />
        {!!errors.password && (
          <div className='fv-plugins-message-container'>
            {' '}
            <div className='fv-help-block'>{errors.password}</div>
          </div>
        )}
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container invalid-feedback'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
