import clsx from 'clsx';
import { FieldHookConfig, useField } from 'formik';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Form, FormCheckProps } from 'react-bootstrap';

//* Get type {name} from  useField()
type GetRequiredKeys<T> = { [K in keyof T as (undefined extends T[K] ? never : K)]: T[K] }
type SomeTypeRequiredKeys = GetRequiredKeys<FieldHookConfig<string>>;

export const CheckBox = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
  > & FormCheckProps & SomeTypeRequiredKeys & { label: string }
>(({ label, className, ...props }, ref) => {

  const [field, meta] = useField(props);
  return (
    <Form.Group>
      <Form.Label htmlFor={props.id || props.name} className='required form-label'>{label}</Form.Label>
      <Form.Check
        ref={ref}
        id={props.id || props.name}
        className={clsx(className, { 'form-control-solid': !meta.touched || !meta.error })}
        isInvalid={!!meta.touched && !!meta.error}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Form.Control.Feedback type='invalid'>{meta.error}</Form.Control.Feedback>
      ) : null}
    </Form.Group>
  )
})