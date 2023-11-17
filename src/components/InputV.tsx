import { forwardRef, InputHTMLAttributes } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'
import clsx from 'clsx'
import { FormikProps } from 'formik'

export const InputV = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> &
    FormControlProps & {
      type?:
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'reset'
        | 'search'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week'
      name: string
      formik?: FormikProps<any>
    }
>(({ type, formik, className, name, onChange, value, required, ...props }, ref) => {
  const { handleChange, handleBlur, values, touched, errors } = formik || {}
  const isInvalid = touched && errors && touched[name] && errors[name]
  // const isInvalid = errors && errors[name]

  return (
    <>
      {type === 'number' ? (
        <Form.Control
          type={type}
          ref={ref}
          id={props.id || name}
          className={clsx({ 'form-control-solid': !isInvalid }, className)}
          isInvalid={!!isInvalid}
          name={name}
          onChange={onChange || handleChange}
          onBlur={handleBlur}
          value={values ? values[name] : value}
          {...props}
        />
      ) : (
        <Form.Control
          type={type}
          ref={ref}
          id={props.id || name}
          className={clsx({ 'form-control-solid': !isInvalid }, className)}
          isInvalid={!!isInvalid}
          name={name}
          onChange={onChange || handleChange}
          onBlur={handleBlur}
          defaultValue={values ? values[name] : value}
          {...props}
        />
      )}
      <Form.Control.Feedback type='invalid'> {isInvalid as string}</Form.Control.Feedback>
    </>
  )
})
