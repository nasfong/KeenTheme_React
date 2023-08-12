import { forwardRef, SelectHTMLAttributes } from 'react';
import { Col, Form, FormSelectProps, Row } from 'react-bootstrap';
import { FieldHookConfig, useField } from 'formik';
import clsx from 'clsx';

//* Get type {name} from  useField()
type GetRequiredKeys<T> = { [K in keyof T as (undefined extends T[K] ? never : K)]: T[K] }
type SomeTypeRequiredKeys = GetRequiredKeys<FieldHookConfig<string>>;

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLInputElement>
  & FormSelectProps
  & SomeTypeRequiredKeys
  & {
    label: string,
    required?: boolean,
    inline?: boolean
  }
>(({ children, label, required, inline, className, ...props }, ref) => {

  const [field, meta] = useField(props);

  const isInvalid = required && !!meta.touched && !!meta.error
  // console.log({ field, meta, helper })
  return (
    <Form.Group as={Row} className={clsx(className, { 'mb-5': !isInvalid })}>
      <Form.Label
        column={inline} lg='3' md='2' sm='2'
        htmlFor={props.id || props.name}
        className={clsx('form-label', { 'required': required })}
      >
        {label}
      </Form.Label>
      <Col className='fv-row'>
        <Form.Select
          ref={ref}
          id={props.id || props.name}
          className={clsx({ 'form-select-solid': !isInvalid })}
          isInvalid={isInvalid}
          {...field}
          {...props}
        >
          {children}
        </Form.Select>
        {isInvalid ? (
          <Form.Control.Feedback type='invalid'>{meta.error}</Form.Control.Feedback>
        ) : null}
      </Col>
    </Form.Group>
  )
})