import { forwardRef, SelectHTMLAttributes } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'
import clsx from 'clsx'
import { FormikProps } from 'formik'

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> &
    FormControlProps & {
      name: string
      formik?: FormikProps<any>
    }
>(
  (
    { formik, className, name, onChange, value, required, children, ...props },
    ref,
  ) => {
    const { handleChange, handleBlur, values, touched, errors } = formik || {}
    const isInvalid = touched && errors && touched[name] && errors[name]

    return (
      <>
        <Form.Select
          ref={ref}
          id={props.id || name}
          className={clsx({ 'form-select-solid': !isInvalid }, className)}
          isInvalid={!!isInvalid}
          name={name}
          onChange={onChange || handleChange}
          onBlur={handleBlur}
          value={values ? values[name] : value}
          {...props}
        >
          {children}
        </Form.Select>
        <Form.Control.Feedback type='invalid'>
          {' '}
          {isInvalid as string}
        </Form.Control.Feedback>
      </>
    )
  },
)
