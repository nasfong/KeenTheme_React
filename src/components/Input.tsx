import { forwardRef, InputHTMLAttributes } from 'react';
import { Col, Form, FormControlProps, Row } from 'react-bootstrap';
import { FieldHookConfig, useField } from 'formik';
import clsx from 'clsx';
import { GetRequiredKeys } from '../types/TGlobal';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
  & FormControlProps //* Form Control type
  & GetRequiredKeys<FieldHookConfig<string>> //* FieldHookConfig<string> useField type
  & {
    label: string,
    type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"
    required?: boolean,
    inline?: boolean
  }
>(({ label, required, inline, className, ...props }, ref) => {

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
        <Form.Control
          ref={ref}
          id={props.id || props.name}
          className={clsx({ 'form-control-solid': !isInvalid })}
          isInvalid={isInvalid}
          {...field}
          {...props}
        />
        {isInvalid ? (
          <Form.Control.Feedback type='invalid'>{meta.error}</Form.Control.Feedback>
        ) : null}
      </Col>
    </Form.Group>
  )
})