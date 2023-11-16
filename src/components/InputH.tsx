import { forwardRef, InputHTMLAttributes } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'
import clsx from 'clsx'

export const InputH = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> &
    FormControlProps & {
      name: string
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
      errors?: string
    }
>(({ errors, className, name, value, required, ...props }, ref) => {
  const isInvalid = !!errors
  return (
    <Form.Control
      ref={ref}
      id={props.id || name}
      className={clsx({ 'form-control-solid': !isInvalid }, className)}
      isInvalid={!!isInvalid}
      name={name}
      {...props}
    />
  )
})
