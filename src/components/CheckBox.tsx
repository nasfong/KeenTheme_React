import { forwardRef, InputHTMLAttributes } from 'react';
import { Col, Form, FormCheckProps, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DotNestedKeys } from '../types/TGlobal';
import { ILanguage } from '../_metronic/i18n';
import { FormikProps } from 'formik';

export const CheckBox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
  & FormCheckProps
  & {
    label?: DotNestedKeys<ILanguage>,
    inline?: boolean,
    name: string,
    formik?: FormikProps<any>,
    required?: boolean
  }
>(({ formik, label, inline, className, name, onChange, value, required, ...props }, ref) => {
  const { t } = useTranslation()
  const { handleChange, handleBlur, values, touched, errors } = formik || {}
  const isInvalid = touched && errors && touched[name] && errors[name]

  return (
    <Form.Group as={Row} className={clsx(className, { 'mb-5': !isInvalid })}>
      {label ?
        <Form.Label
          column={inline} lg='3' md='4' sm='3'
          htmlFor={props.id || name}
          className={clsx('form-label text-nowrap', { 'required': required })}
        >
          {t(label)}
        </Form.Label>
        : null}
      <Col>
        <Form.Check
          ref={ref}
          id={props.id || name}
          className={clsx({ 'form-control-solid': !isInvalid })}
          isInvalid={!!isInvalid}
          name={name}
          onChange={onChange || handleChange}
          onBlur={handleBlur}
          defaultValue={values ? values[name] : value}
          {...props}
        />
        <Form.Control.Feedback type='invalid'>{isInvalid as string}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
})